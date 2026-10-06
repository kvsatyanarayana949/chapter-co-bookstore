export default function EmptyState({ title, message, action }) {
  return (
    <section className="empty-state">
      <div className="empty-illustration" aria-hidden="true">
        <span>Chapter & Co.</span>
      </div>
      <h1>{title}</h1>
      <p>{message}</p>
      {action}
    </section>
  );
}
