export default function Input({
  label,
  value,
  onChange,
  error,
  leftIcon,
  rightElement,
  style = {},
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{label}</label>}
      <div style={{ position: 'relative', width: '100%' }}>
        {leftIcon && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>{leftIcon}</span>}
        <input
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            borderRadius: 12,
            border: '1px solid #ddd',
            padding: leftIcon ? '12px 12px 12px 38px' : '12px',
            outline: 'none',
            fontSize: 14,
            color: '#0f1117',
            boxSizing: 'border-box',
            ...style,
          }}
          onFocus={(e) => (e.target.style.borderColor = '#1a73e8')}
          onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          {...props}
        />
        {rightElement && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>{rightElement}</span>}
      </div>
      {error && <p style={{ color: '#ef4444', fontSize: 12 }}>{error}</p>}
    </div>
  );
}
