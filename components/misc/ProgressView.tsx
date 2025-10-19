import { Loading02 } from "@untitledui/icons";

export function ProgressView({
  className = "fill-label-primary",
}: {
  className?: string;
}) {
  return (
    <>
      <style>
        {`
        @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
        }
        `}
      </style>
      <div style={{ animation: "spin 2s linear infinite" }}>
        <Loading02 height="1rem" width="1rem" className={className} />
      </div>
    </>
  );
}
