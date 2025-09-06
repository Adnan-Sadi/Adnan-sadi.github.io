import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-semibold mb-2">404</h1>
      <p className="mb-6">Page not found.</p>
      <Link to="/" className="rounded border px-3 py-1 no-underline">
        Go home
      </Link>
    </div>
  );
}
