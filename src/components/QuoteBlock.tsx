type QuoteBlockProps = {
  quote: string;
  attribution?: string;
};

export function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  return (
    <blockquote className="quote-block">
      <p>“{quote}”</p>
      {attribution ? <cite>{attribution}</cite> : null}
    </blockquote>
  );
}
