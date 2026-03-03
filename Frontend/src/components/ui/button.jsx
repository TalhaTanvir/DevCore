import { cn } from '../../lib/utils'

const VARIANT_CLASS = {
  default: 'border border-black bg-black text-white hover:bg-white hover:text-black',
  secondary: 'border border-black bg-white text-black hover:bg-black hover:text-white',
  ghost: 'border border-transparent bg-transparent text-current hover:bg-black hover:text-white',
  destructive: 'border border-black bg-black text-white hover:bg-white hover:text-black',
  outline: 'border border-black bg-white text-black hover:bg-black hover:text-white',
}

const SIZE_CLASS = {
  default: 'h-9 px-4 py-2 text-sm',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-10 px-6 text-sm',
  icon: 'h-9 w-9',
}

export function Button({ className, variant = 'default', size = 'default', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        VARIANT_CLASS[variant] ?? VARIANT_CLASS.default,
        SIZE_CLASS[size] ?? SIZE_CLASS.default,
        className,
      )}
      {...props}
    />
  )
}
