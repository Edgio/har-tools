export const Header = () => {
  return (
    <>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "0", paddingTop: "20px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%"}}>
          <h1 style={{ fontSize: "2.5em", padding: "5px", margin: "25px" }}>HAR Tools</h1>
          <img src="./logo.webp" style={{padding: "5px", width: "150px", height: "63px"}} />
        </div>
      </div>
      <p>
        HAR Tools is a curated set of tools that aim to protect you from getting owned when sharing a HAR file.
      </p>
      <h3>
        What are HAR files and what are the security concerns around them?
      </h3>
      <p>
        HAR files (standing for HTTP Archive) are JSON-formatted files with{" "}
        <code>.har</code> extensions and are used to log web browser
        interactions. The format is employed by HTTP session tools for archiving
        HTTP transactions. This allows browsers to record and export in-depth
        loading performance data.
      </p>
      <p>
        Most HAR files contain details like your cookie contents and the pages
        you accessed during the recording. Due to the highly invasive process of
        recording a web browser's activity, whoever obtains the HAR file will
        see all the submitted information which might contain private or
        sensitive data.
      </p>
    </>
  );
};
