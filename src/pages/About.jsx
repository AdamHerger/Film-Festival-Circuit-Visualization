import pdfFile from "../assets/reference.pdf";
function About() {
  return (
    <div className="about-page">
      <div className="pdf-viewer">
        <iframe
          src={pdfFile}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="tool guide"
        >
          <p>Could not load PDF.</p>
        </iframe>
      </div>
    </div>
  );
}

export default About;
