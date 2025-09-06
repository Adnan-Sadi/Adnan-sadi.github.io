export default function CV() {
  const pdf = "/assets/cv.pdf"; // drop your CV here
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Curriculum Vitae</h1>
      <div className="mb-4">
        <a
          href={pdf}
          download
          className="rounded border px-3 py-1 text-sm no-underline"
        >
          Download PDF
        </a>
      </div>
      <object
        data={`${pdf}#view=FitH`}
        type="application/pdf"
        className="w-full h-[80vh] border rounded"
      >
        <p>
          PDF preview not supported in this browser.{" "}
          <a href={pdf}>Open the file</a>.
        </p>
      </object>
    </div>
  );
}
