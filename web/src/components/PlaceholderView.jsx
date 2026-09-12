export default function PlaceholderView({ icon, title, description, children }) {
  return (
    <main className="view">
      <div className="placeholder-view">
        <span className="big">{icon}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </div>
    </main>
  );
}
