interface CodeDisplayProps {
  code: string;
  className?: string;
}

export default function CodeDisplay({ code, className }: CodeDisplayProps) {
  return (
    <div className={`bg-code-bg rounded-[5px] p-4 ${className}`}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
