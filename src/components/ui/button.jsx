import clsx from 'clsx'

export const Button = ({ onClick, disabled, children, ...props }) => {
  return (
    <button
      className={clsx(
        'bg-blue-900 px-3 rounded text-white text-xl',
        disabled ? 'opacity-50' : 'hover:bg-blue-800',
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
