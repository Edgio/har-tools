import { useState } from "react";
import { FileInput } from "./FileInput";

export const Upload = ({ setUpload }) => {
  const [harError, setHarError] = useState("");

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContents = e?.target?.result;
          if (
            fileContents &&
            (typeof fileContents === "string" || fileContents)
          ) {
            setUpload({
              raw: fileContents,
              name: selectedFile.name,
              parsed: JSON.parse(fileContents),
            });
            setHarError("");
            return;
          }
          throw new Error("failed to upload file");
        } catch (e) {
          console.log(e);
          setHarError(`${e?.toString()}`);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <>
      <label
        htmlFor="har-file"
        style={{ fontSize: "1.2em", fontWeight: "bold", paddingLeft: "20px" }}
      >
        Upload File
      </label>

      <FileInput id="har-file" onFileChange={handleFileChange} accept=".har" />
      {harError && (
        <div>
          <br />
          <p>Invalid HAR file</p>
          <span>{harError}</span>
        </div>
      )}
    </>
  );
};
