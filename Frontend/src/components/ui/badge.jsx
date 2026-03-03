import { cn } from '../../lib/utils'

const VARIANT_CLASS = {
  default: 'border-black bg-black text-white',
  secondary: 'border-black bg-white text-black',
  outline: 'border-black bg-white text-black',
  success: 'border-black bg-white text-black',
  warning: 'border-black bg-white text-black',
  danger: 'border-black bg-white text-black',
}

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        VARIANT_CLASS[variant] ?? VARIANT_CLASS.default,
        className,
      )}
      {...props}
    />
  )
}
