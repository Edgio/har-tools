import { download } from "./download.js";
import { defaultRegex, buildRegex } from "./regex.js";

const defaultMimeTypesList = [
  "application/javascript",
  "text/javascript",
  "application/json",
  "image/jpeg",
  "binary/octet-stream",
  "text/html",
  "image/vnd.microsoft.icon",
];

const defaultWordList = [
  "Authorization",
  "SAMLRequest",
  "SAMLResponse",
  "access_token",
  "appID",
  "assertion",
  "auth",
  "authenticity_token",
  "challenge",
  "client_id",
  "client_secret",
  "code",
  "code_challenge",
  "code_verifier",
  "email",
  "facetID",
  "fcParams",
  "id_token",
  "password",
  "refresh_token",
  "serverData",
  "shdf",
  "state",
  "token",
  "usg",
  "vses2",
  "x-client-data",
];

const defaultRedacted = [...defaultMimeTypesList, ...defaultWordList];

export const defaultRedactState = {
  cookies: {},
  headers: {},
  queryArgs: {},
  postParams: {},
  mimeTypes: {},
};

function removeContentForMime(input, redactList) {
  const harJSON = JSON.parse(input);
  const entries = harJSON.log.entries;
  if (!entries) {
    throw new Error("failed to find entries in HAR file");
  }
  for (const entry of entries) {
    const res = entry.response;
    if (res && redactList.includes(res.content.mimeType)) {
      res.content.text = `[${res.content.mimeType} redacted]`;
    }
  }
  return JSON.stringify(harJSON, null, 2);
}

function getRedactedMime(opt, possibleRedact) {
  if (opt?.allMimeTypes && !!possibleRedact) {
    return possibleRedact.mimeTypes;
  }
  return opt?.redactMimeTypes || defaultMimeTypesList;
}

function getRedactedWords(opt, possibleRedact) {
  let redactWords = opt?.redactWords || [];
  if (opt?.allCookies && !!possibleRedact) {
    redactWords = redactWords.concat(possibleRedact.cookies);
  }
  if (opt?.allHeaders && !!possibleRedact) {
    redactWords = redactWords.concat(possibleRedact.headers);
  }
  if (opt?.allQueryArgs && !!possibleRedact) {
    redactWords = redactWords.concat(possibleRedact.queryArgs);
  }
  if (opt?.allPostParams && !!possibleRedact) {
    redactWords = redactWords.concat(possibleRedact.postParams);
  }
  return redactWords || defaultRedacted;
}

export function getHarInfo(input) {
  const out = {
    headers: new Set(),
    queryArgs: new Set(),
    cookies: new Set(),
    postParams: new Set(),
    mimeTypes: new Set(),
  };
  const harJSON = JSON.parse(input);
  const entries = harJSON.log.entries;
  if (!entries) {
    throw new Error("failed to find entries in HAR file");
  }

  for (const entry of entries) {
    const res = entry.response;
    res.headers.map((header) => out.headers.add(header.name));
    res.cookies.map((cookie) => out.cookies.add(cookie.name));
    out.mimeTypes.add(res.content.mimeType);

    const req = entry.request;
    req.headers.map((header) => out.headers.add(header.name));
    req.queryString.map((arg) => out.queryArgs.add(arg.name));
    req.cookies.map((cookie) => out.cookies.add(cookie.name));

    if (req.postData) {
      req.postData.params?.map((param) => out.postParams.add(param.name));
    }
  }

  return {
    headers: [...out.headers].sort(),
    queryArgs: [...out.queryArgs].sort(),
    cookies: [...out.cookies].sort(),
    postParams: [...out.postParams].sort(),
    mimeTypes: [...out.mimeTypes].sort(),
  };
}

export function sanitize(input, opt) {
  console.log("options", JSON.stringify(opt, null, 2));
  let possibleRedact;
  if (
    opt?.allCookies ||
    opt?.allHeaders ||
    opt?.allMimeTypes ||
    opt?.allQueryArgs ||
    opt?.allPostParams
  ) {
    possibleRedact = getHarInfo(input);
  }
  input = removeContentForMime(input, getRedactedMime(opt, possibleRedact));
  const wordList = getRedactedWords(opt, possibleRedact).filter((val) =>
    input.includes(val),
  );
  const wordSpecificRedactList = wordList.map((word) => buildRegex(word));
  const allRedactList = defaultRegex.concat(wordSpecificRedactList);

  for (const redactList of allRedactList) {
    for (const redact of redactList) {
      input = input.replace(redact.regex, redact.replacement);
    }
  }
  return input;
}

export function getRedactedItems(input) {
  const rawItems = getHarInfo(input);
  const out = { ...defaultRedactState };
  Object.entries(rawItems).map(([key, items]) => {
    out[key] = items.reduce((acc, curr) => {
      if (!curr) return acc;
      acc[curr] = defaultRedacted.includes(curr);
      return acc;
    }, {});
  });
  return out;
}

export { download };
