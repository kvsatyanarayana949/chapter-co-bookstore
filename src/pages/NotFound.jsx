import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';

export default function NotFound() {
  return (
    <div className="container page-section">
      <EmptyState
        title="Page Not Found"
        message="The page you requested does not exist. Head back home or browse the catalogue."
        action={<Link className="button" to="/">Go Home</Link>}
      />
    </div>
  );
}
