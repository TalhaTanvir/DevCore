import { PencilLine, Trash2 } from 'lucide-react'

const toLabel = (value) =>
  String(value)
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())

export function AdminResourceList({ resource, items, loading, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-slate-900">Manage {resource.label}</h2>
        <span className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600">
          {items.length} total
        </span>
      </div>

      {loading ? <p className="mt-4 text-sm text-slate-500">Loading...</p> : null}

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <article key={item._id} className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-1.5">
                {resource.previewFields.map((fieldName) => (
                  <p key={fieldName} className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">{toLabel(fieldName)}:</span>{' '}
                    <span className="break-words">{String(item[fieldName] ?? '')}</span>
                  </p>
                ))}

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
                    Order {item.order}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {item.isActive ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
                >
                  <PencilLine className="h-4 w-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item._id)}
                  className="inline-flex items-center gap-1 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm text-red-700 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}

        {!loading && items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            No {resource.label.toLowerCase()} found.
          </p>
        ) : null}
      </div>
    </div>
  )
}
