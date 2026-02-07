'use client';

import { useEffect } from 'react';
import { Link } from '@/i18n/routing';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF3E7] px-4">
      <h2 className="text-2xl font-bold text-[#111827] mb-4">Something went wrong</h2>
      <p className="text-gray-700 mb-6 text-center">We encountered an error. Please try again.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-[#C2410C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#9A3412] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-white text-[#C2410C] border-2 border-[#C2410C] px-6 py-3 rounded-full font-semibold hover:bg-[#FEF3E7] transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
