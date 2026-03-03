import { cn } from '../../lib/utils'

export function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'h-9 w-full rounded-md border border-black/40 bg-white px-3 py-1 text-sm text-black shadow-sm outline-none transition-colors placeholder:text-black/50 focus:border-black focus:ring-2 focus:ring-black/20',
        className,
      )}
      {...props}
    />
  )
}
