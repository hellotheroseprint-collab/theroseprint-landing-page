type BookCoverProps = {
  alt?: string;
  shadow?: "hero" | "thumb" | "card";
};

export default function BookCover({ alt = "", shadow = "hero" }: BookCoverProps) {
  return (
    <div className={`book book--${shadow}`}>
      <div className="book__edge" />
      <img
        className="book__cover"
        src="/guide/preview-cover.png"
        alt={alt}
      />
      <div className="book__spine" />
      <div className="book__gloss" />
    </div>
  );
}
