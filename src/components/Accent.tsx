type AccentProps = {
  children: string;
  tone?: "ink" | "blush";
};

export default function Accent({ children, tone = "ink" }: AccentProps) {
  return (
    <span className={tone === "blush" ? "accent accent--blush" : "accent"}>
      {children}
    </span>
  );
}
