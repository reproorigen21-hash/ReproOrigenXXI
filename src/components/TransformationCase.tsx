type TransformationCaseProps = {
  title: string;
  description: string;
};

export function TransformationCase({ title, description }: TransformationCaseProps) {
  return (
    <article className="transformation-case">
      <strong>{title}</strong>
      <p>{description}</p>
    </article>
  );
}
