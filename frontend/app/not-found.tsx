import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-8">Page Not Found</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go Home
        </Link>
      </div>
    </div>
  );
}
