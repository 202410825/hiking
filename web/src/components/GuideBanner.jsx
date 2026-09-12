export default function GuideBanner({ visible, title, message }) {
  if (!visible) return null;
  return (
    <div className="guide-banner">
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  );
}
