# HAR Tools

HAR Tools is a curated set of tools, scripts, and strategies that aim to protect you from getting owned when sharing a HAR file. There are three main pieces of HAR Tools:

- [**Web Client**](/client/README.md) - Sanitize generated HAR files with client-side JavaScript logic using a hosted, drag and drop web application.
- [**API**](/api/README.md) - Sanitize generated HAR files with a request to an endpoint.
- [**Devtools**](/devtools/README.md) - Sanitize a HAR File before it is generated with Chrome Devtools API

## What is a HAR File?

HAR files (standing for HTTP Archive) are JSON-formatted archive files used to log web browser interactions. The HAR file format is employed by various HTTP session tools for exporting recorded data. In essence, it is a JSON object structured with specific fields. It's designed to archive HTTP transactions and allow browsers to export in-depth loading performance data.

The file contains a record of a web browser's activity on a website in JSON format, typically saved with a `.har` extension. Most HAR files contain details like your cookie contents and the pages you accessed during the recording. But since not all fields are required, there are instances where it's ambiguous what data will be included in the file.

If someone obtains the HAR file, they can see all the submitted information, which might contain private or sensitive data. Due to the highly invasive process of recording a web browser's activity, HAR files frequently and unintentionally function as highly efficient formats for collecting and distributing large volumes of sensitive personal data.
