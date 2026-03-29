const variantStyles = {
  default: {
    background: '#ffffff',
    borderRadius: 20,
    padding: 32,
    maxWidth: 380,
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    border: '1px solid rgba(15,17,23,0.08)',
  },
  glass: {
    background: 'rgba(255,255,255,0.86)',
    borderRadius: 20,
    padding: 32,
    maxWidth: 380,
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    border: '1px solid rgba(255,255,255,0.36)',
    backdropFilter: 'blur(14px)',
  },
};

export default function Card({ children, variant = 'default', style = {}, ...props }) {
  return (
    <div style={{ ...variantStyles[variant] || variantStyles.default, ...style }} {...props}>
      {children}
    </div>
  );
}
