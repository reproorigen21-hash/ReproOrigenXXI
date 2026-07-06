type EditorialBlockProps = {
  heading: string;
  copy: string;
};

export function EditorialBlock({ heading, copy }: EditorialBlockProps) {
  return (
    <article className="editorial-block">
      <h4>{heading}</h4>
      <p>{copy}</p>
    </article>
  );
}
