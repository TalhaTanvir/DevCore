import { cn } from '../../lib/utils'

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'h-9 w-full rounded-md border border-black/40 bg-white px-3 py-1 text-sm text-black outline-none transition-colors focus:border-black focus:ring-2 focus:ring-black/20',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}
