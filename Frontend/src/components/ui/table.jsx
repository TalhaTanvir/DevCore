import { cn } from '../../lib/utils'

export function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn('[&_tr]:border-b [&_tr]:border-black/30', className)} {...props} />
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn('border-b border-black/20 transition-colors hover:bg-black/5 data-[state=selected]:bg-black/10', className)}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn('h-10 px-4 text-left align-middle text-xs font-medium uppercase tracking-wide text-black/70 [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }) {
  return <td className={cn('p-4 align-middle text-sm text-black [&:has([role=checkbox])]:pr-0', className)} {...props} />
}
