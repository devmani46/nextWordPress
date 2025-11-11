export default function DefaultTemplate({ page }) {
  return (
    <div>
      <h1>{page.title.rendered}</h1>
      <h1>This is the default template</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
