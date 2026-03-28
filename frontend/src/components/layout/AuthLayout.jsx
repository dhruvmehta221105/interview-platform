export default function AuthLayout({ children }) {
  const gradient = "linear-gradient(180deg, #c0b0ee 0%, #c8bcf4 12%, #d8d0fa 26%, #e4e0ff 42%, #eeeeff 60%, #f0f2fa 80%, #f5f6fa 100%)";
  return (
    <div style={{ minHeight: '100vh', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      {children}
    </div>
  );
}
