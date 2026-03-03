import { FileText, FolderKanban, LayoutGrid, MessageSquareQuote } from 'lucide-react'

const RESOURCE_ICONS = {
  work: FolderKanban,
  testimonials: MessageSquareQuote,
  services: LayoutGrid,
  faqs: FileText,
}

export function AdminResourceTabs({ resources, activeResource, onResourceChange }) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      {Object.entries(resources).map(([resourceKey, resourceInfo]) => {
        const isActive = resourceKey === activeResource
        const Icon = RESOURCE_ICONS[resourceKey] ?? LayoutGrid

        return (
          <button
            key={resourceKey}
            type="button"
            onClick={() => onResourceChange(resourceKey)}
            className={`inline-flex w-full items-center gap-2 rounded-md border px-4 py-2 text-left text-sm font-medium transition ${
              isActive
                ? 'border-white/20 bg-white text-black'
                : 'border-white/10 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
            {resourceInfo.label}
          </button>
        )
      })}
    </div>
  )
}
