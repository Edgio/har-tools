# HAR Tools API

## Test Official API

```bash
jq '{"har": .}' < example.har | curl -X POST \
  -H "Content-Type: application/json" \
  -L --post301 \
  --data @- \
  api.har.tools > scrub.har
```

`-L` and `--post301` are necessary because right now `api.har.tools` redirects to `https://ajc-har-tools-api-default.glb.edgio.link/`.

## Local Development

```bash
npm i
npm start
```

### Test local API

Use `jq` to work directly with `.har` files.

```bash
jq '{"har": .}' < example.har | curl -X POST \
  -H "Content-Type: application/json" \
  --data @- \
  localhost:3000 > scrub.har
```

Use without `jq` by converting `.har` files into `.json` files.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -L --post301 \
  --data @example-har.json \
  localhost:3000 > scrub.json
```

## Deploy to Edgio

```bash
npm run deploy
```
