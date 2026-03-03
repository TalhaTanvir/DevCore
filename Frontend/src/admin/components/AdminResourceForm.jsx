import { CheckCircle2, CircleX, PenLine, PlusCircle, Save } from 'lucide-react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'

function renderField(field, form, onChangeField) {
  if (field.type === 'checkbox') {
    return (
      <label key={field.name} className="flex items-center gap-2 rounded-md border border-black/30 bg-white p-2 text-sm text-black">
        <input
          type="checkbox"
          name={field.name}
          checked={Boolean(form[field.name])}
          onChange={onChangeField}
          className="h-4 w-4 rounded border-black/40 accent-black"
        />
        {field.label}
      </label>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div key={field.name} className="space-y-1.5">
        <Label htmlFor={field.name}>{field.label}</Label>
        <Textarea
          id={field.name}
          name={field.name}
          value={form[field.name] ?? ''}
          onChange={onChangeField}
          required={field.required}
          className="min-h-28"
        />
      </div>
    )
  }

  if (field.type === 'select') {
    return (
      <div key={field.name} className="space-y-1.5">
        <Label htmlFor={field.name}>{field.label}</Label>
        <Select id={field.name} name={field.name} value={form[field.name] ?? ''} onChange={onChangeField} required={field.required}>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
    )
  }

  return (
    <div key={field.name} className="space-y-1.5">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Input
        id={field.name}
        type={field.type}
        name={field.name}
        value={form[field.name] ?? ''}
        onChange={onChangeField}
        min={field.min}
        required={field.required}
        className="border-black/40 bg-white text-black placeholder:text-black/50 focus:border-black focus:ring-black/20"
      />
    </div>
  )
}

export function AdminResourceForm({
  resource,
  form,
  submitting,
  isEditing,
  message,
  error,
  onChangeField,
  onSubmit,
  onCancelEdit,
  onClose,
}) {
  const publishFieldNames = new Set(['order', 'isActive'])
  const contentFields = resource.fields.filter((field) => !publishFieldNames.has(field.name))
  const publishFields = resource.fields.filter((field) => publishFieldNames.has(field.name))

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="outline" className="rounded-md border-black bg-white text-black">
          {isEditing ? <PenLine className="h-3.5 w-3.5" /> : <PlusCircle className="h-3.5 w-3.5" />}
          {isEditing ? 'Editing Mode' : 'Create Mode'}
        </Badge>
        <p className="text-sm text-black/70">
          {isEditing ? 'Update existing content details.' : 'Create a new record for this section.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {contentFields.map((field) => (
          <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
            {renderField(field, form, onChangeField)}
          </div>
        ))}
      </div>

      {publishFields.length > 0 ? (
        <section className="space-y-3 rounded-lg border border-black/30 bg-white p-4">
          <h3 className="text-sm font-semibold text-black">Publishing Settings</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {publishFields.map((field) => (
              <div key={field.name}>{renderField(field, form, onChangeField)}</div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={submitting} className="bg-black text-white hover:bg-white hover:text-black">
          <Save className="h-4 w-4" />
          {submitting ? 'Saving...' : isEditing ? `Update ${resource.singularLabel}` : `Create ${resource.singularLabel}`}
        </Button>

        {onClose ? (
          <Button type="button" onClick={onClose} variant="outline" className="border-black bg-white text-black hover:bg-black hover:text-white">
            Close
          </Button>
        ) : null}

        {isEditing ? (
          <Button
            type="button"
            onClick={onCancelEdit}
            variant="outline"
            className="border-black bg-white text-black hover:bg-black hover:text-white"
          >
            <CircleX className="h-4 w-4" />
            Cancel Edit
          </Button>
        ) : null}
      </div>

      {message ? (
        <p className="inline-flex items-center gap-2 rounded-md border border-black bg-white px-3 py-2 text-sm text-black">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="inline-flex items-center gap-2 rounded-md border border-black bg-black px-3 py-2 text-sm text-white">
          <CircleX className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </form>
  )
}
