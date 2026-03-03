import { cn } from '../../lib/utils'

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'min-h-24 w-full rounded-md border border-black/40 bg-white px-3 py-2 text-sm text-black outline-none transition-colors placeholder:text-black/50 focus:border-black focus:ring-2 focus:ring-black/20',
        className,
      )}
      {...props}
    />
  )
}
