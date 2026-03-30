export default function PasswordStrength({ password = '' }) {
  const score = password.length > 9 ? 4 : password.length > 7 ? 3 : password.length > 5 ? 2 : password.length > 3 ? 1 : 0;
  const bars = [1,2,3,4];
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {bars.map((bar) => (
          <span
            key={bar}
            className={`h-1.5 flex-1 rounded ${bar <= score ? 'bg-emerald-500' : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-1">Strength: {['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][score]}</p>
    </div>
  );
}
