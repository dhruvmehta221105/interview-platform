import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-slate-600 mb-4">This is a placeholder Profile page.</p>
        <Link to="/" className="text-brand-indigo underline">Go back home</Link>
      </div>
    </div>
  );
}
