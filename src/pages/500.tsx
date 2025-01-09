import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">500 - Server-side error occurred</h1>
      <p className="mt-4">Sorry, something went wrong on our end.</p>
      <Link href="/">
        <a className="mt-6 text-blue-500">Go back to Home</a>
      </Link>
    </div>
  );
}
