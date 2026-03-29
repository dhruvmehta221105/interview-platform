const variantProps = {
  primary: {
    background: '#1a73e8',
    color: '#fff',
    border: '1px solid #1a73e8',
    hover: { background: '#1665cc' },
  },
  social: {
    background: '#f8fafc',
    color: '#0f172a',
    border: '1px solid #cbd5e1',
    hover: { background: '#e2e8f0' },
  },
  default: {
    background: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    hover: { background: '#e2e8f0' },
  },
};

const sizeProps = {
  sm: { padding: '8px 14px', fontSize: 14 },
  md: { padding: '10px 20px', fontSize: 15 },
  lg: { padding: '12px 22px', fontSize: 16 },
};

export default function Button({
  children,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  loading = false,
  style = {},
  ...props
}) {
  const v = variantProps[variant] || variantProps.default;
  const s = sizeProps[size] || sizeProps.md;

  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 100,
        fontWeight: 600,
        cursor: 'pointer',
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s ease',
        ...v,
        ...s,
        ...style,
      }}
      disabled={loading || props.disabled}
      onMouseOver={(e) => {
        e.currentTarget.style.background = v.hover.background;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = v.background;
      }}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
