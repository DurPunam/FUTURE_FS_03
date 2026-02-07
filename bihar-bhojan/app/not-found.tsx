import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF3E7] px-4">
      <h1 className="text-6xl font-bold text-[#111827] mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="bg-[#C2410C] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#9A3412] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
