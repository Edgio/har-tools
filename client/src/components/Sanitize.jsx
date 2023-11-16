import { useEffect, useState } from "react";
import { Upload } from "./Upload";
import { SelectRedactions } from "./SelectRedactions";
import sampleHar from "../utils/example-har.json";
import {
  sanitize,
  defaultRedactState,
  download,
  getRedactedItems,
} from "../utils/index.js";

export const Sanitize = () => {
  const [upload, setUpload] = useState();
  const [redactItems, setRedactedItems] = useState(defaultRedactState);
  const [error, setError] = useState(null);

  const sanitizeHar = (input) => {
    try {
      const addIfTruthy = (source, set) => {
        Object.entries(source).forEach(([key, val]) => {
          if (val) set.add(key);
        });
      };
      const redactWords = new Set();
      const redactMimeTypes = new Set();
      ["cookies", "headers", "queryArgs", "postParams"].forEach((item) => {
        addIfTruthy(redactItems[item], redactWords);
      });
      addIfTruthy(redactItems.mimeTypes, redactMimeTypes);
      return sanitize(input, {
        redactWords: [...redactWords],
        redactMimeTypes: [...redactMimeTypes],
      });
    } catch (error) {
      setError(`Error sanitizing HAR file: ${error.message}`);
    }
  };
  const handleLoadSampleClick = () => {
    const sampleUpload = {
      name: "example-har.json",
      raw: JSON.stringify(sampleHar),
    };
    setUpload(sampleUpload);
    try {
      const items = getRedactedItems(sampleUpload.raw);
      setRedactedItems(items);
    } catch (e) {
      setError(e.toString());
    }
  };
  const handleDownloadClick = () => {
    try {
      const newName = `redacted_${upload.name}`;
      const sanitizedHar = sanitizeHar(upload.raw);
      JSON.parse(sanitizedHar);
      download(sanitizedHar, newName);
    } catch (e) {
      setError(e.toString());
    }
  };
  useEffect(() => {
    try {
      if (upload?.raw) {
        const items = getRedactedItems(upload?.raw);
        setRedactedItems(items);
      }
    } catch (e) {
      setError(e.toString());
    }
  }, [upload?.raw]);
  if (error) {
    return (
      <div>
        <Upload setUpload={setUpload} />
        <br />
        <p>Error reading HAR file</p>
        <span>{error}</span>
      </div>
    );
  }
  return (
    <>
      <h2>HAR Tools Web Client</h2>
      <button style={{}} onClick={handleLoadSampleClick}>
        Load Sample HAR
      </button>
      <Upload setUpload={setUpload} />
      {redactItems && upload && (
        <>
          <SelectRedactions
            redactItems={redactItems}
            setRedactedItems={setRedactedItems}
          />
          <button onClick={handleDownloadClick}>Download Sanitized HAR</button>
        </>
      )}
    </>
  );
};
