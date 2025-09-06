export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted">
        © {year} Abu Adnan Sadi. All rights reserved.
      </div>
    </footer>
  );
}
