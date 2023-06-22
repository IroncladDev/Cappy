export default function PathReference({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 1 1"
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        {children}
      </clipPath>
    </svg>
  );
}
