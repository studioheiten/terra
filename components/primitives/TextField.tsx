type Props = {
  title?: string | undefined;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  prefix?: string;
};

export default function TextField({
  title,
  placeholder,
  value,
  onChange,
  className,
  prefix,
}: Props) {
  return (
    <div
      className={`w-full flex flex-col gap-2 items-stretch justify-start ${className}`}
    >
      {title && (
        <p className="text-body text-label-secondary px-2 text-start line-clamp-1">
          {title}
        </p>
      )}

      <div className="flex px-4 py-2.5 items-center rounded-xl border-[0.5px] border-separator-non-opaque outline-0 ring-0 focus-within:border-accent transition-all duration-200">
        {prefix && (
          <span className="text-body text-label-secondary">{prefix}</span>
        )}
        <input
          placeholder={placeholder ?? "Type here"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-body text-start placeholder:text-label-tertiary outline-0 ring-0 bg-transparent"
        />
      </div>
    </div>
  );
}
