import { highlight } from "sugar-high";

export function CodeBlock({ code }: { code: string }) {
  const html = highlight(code);
  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}
