export const Header = () => {
  return (
    <>
      <img src="https://docs.edg.io/_next/static/media/edgio-dark.ea0d686f.webp" width="100"/>
      <br />
      <h1 style={{ fontSize: "3em" }}>HAR Tools</h1>
      <p>
        The HAR Tools is a curated set of tools, scripts, and strategies that
        aim to protect you from getting owned when sharing a HAR file.
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
