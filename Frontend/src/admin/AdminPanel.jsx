import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../lib/apiClient'

const RESOURCE_CONFIG = {
  services: {
    label: 'Services',
    singularLabel: 'Service',
    endpoint: '/api/services/admin',
    emptyForm: {
      title: '',
      description: '',
      icon: 'window',
      order: 1,
      isActive: true,
    },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      {
        name: 'icon',
        label: 'Icon',
        type: 'select',
        required: true,
        options: ['window', 'screen', 'tag', 'spark'],
      },
      { name: 'order', label: 'Order', type: 'number', min: 0, required: true },
      { name: 'isActive', label: 'Active', type: 'checkbox' },
    ],
    previewFields: ['title', 'description', 'icon'],
  },
  work: {
    label: 'Work',
    singularLabel: 'Work Item',
    endpoint: '/api/work/admin',
    emptyForm: {
      key: '',
      category: '',
      title: '',
      subtitle: '',
      fallback: '#d9dee6',
      image: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80')",
      imagePublicId: '',
      order: 1,
      isActive: true,
    },
    fields: [
      { name: 'key', label: 'Key', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea', required: true },
      { name: 'fallback', label: 'Fallback Color', type: 'text', required: true },
      { name: 'image', label: 'Image (CSS background value)', type: 'text', required: true },
      { name: 'imagePublicId', label: 'Image Public ID', type: 'text' },
      { name: 'order', label: 'Order', type: 'number', min: 0, required: true },
      { name: 'isActive', label: 'Active', type: 'checkbox' },
    ],
    previewFields: ['title', 'category', 'subtitle', 'key'],
  },
  testimonials: {
    label: 'Testimonials',
    singularLabel: 'Testimonial',
    endpoint: '/api/testimonials/admin',
    emptyForm: {
      quote: '',
      name: '',
      role: '',
      avatar: '',
      order: 1,
      isActive: true,
    },
    fields: [
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'avatar', label: 'Avatar URL', type: 'text', required: true },
      { name: 'order', label: 'Order', type: 'number', min: 0, required: true },
      { name: 'isActive', label: 'Active', type: 'checkbox' },
    ],
    previewFields: ['name', 'role', 'quote'],
  },
  faqs: {
    label: 'FAQs',
    singularLabel: 'FAQ',
    endpoint: '/api/faqs/admin',
    emptyForm: {
      key: '',
      question: '',
      answer: '',
      order: 1,
      isActive: true,
    },
    fields: [
      { name: 'key', label: 'Key', type: 'text', required: true },
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'order', label: 'Order', type: 'number', min: 0, required: true },
      { name: 'isActive', label: 'Active', type: 'checkbox' },
    ],
    previewFields: ['question', 'answer', 'key'],
  },
}

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeResource, setActiveResource] = useState('work')
  const [items, setItems] = useState([])
  const [form, setForm] = useState(RESOURCE_CONFIG.work.emptyForm)
  const [editingId, setEditingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const resource = RESOURCE_CONFIG[activeResource]
  const isEditing = useMemo(() => Boolean(editingId), [editingId])

  const resetForm = useCallback((resourceKey = activeResource) => {
    setEditingId('')
    setForm({ ...RESOURCE_CONFIG[resourceKey].emptyForm })
  }, [activeResource])

  const loadResource = useCallback(async (resourceKey = activeResource) => {
    setLoading(true)
    setError('')

    try {
      const currentResource = RESOURCE_CONFIG[resourceKey]
      const payload = await apiRequest(currentResource.endpoint)

      if (!payload?.success || !Array.isArray(payload?.data)) {
        throw new Error(payload?.error || payload?.message || `Failed to fetch ${currentResource.label}`)
      }

      setItems(payload.data)
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }, [activeResource])

  const checkAuthSession = useCallback(async () => {
    try {
      const payload = await apiRequest('/api/admin/me')
      setIsAuthenticated(Boolean(payload?.success))
    } catch {
      setIsAuthenticated(false)
    } finally {
      setAuthChecking(false)
    }
  }, [])

  useEffect(() => {
    checkAuthSession()
  }, [checkAuthSession])

  useEffect(() => {
    if (!isAuthenticated) return
    loadResource(activeResource)
    resetForm(activeResource)
  }, [isAuthenticated, activeResource, loadResource, resetForm])

  const onLogin = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    try {
      const payload = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: { email, password },
      })

      if (!payload?.success) {
        throw new Error(payload?.error || payload?.message || 'Login failed')
      }

      setIsAuthenticated(true)
      setMessage('Logged in successfully')
    } catch (loginError) {
      setError(loginError.message)
    }
  }

  const onLogout = async () => {
    setError('')
    setMessage('')

    try {
      await apiRequest('/api/admin/logout', {
        method: 'POST',
      })
    } catch {
      // Clear local auth state even if network logout fails.
    } finally {
      setIsAuthenticated(false)
      setItems([])
      setMessage('Logged out')
      resetForm()
    }
  }

  const onChangeField = (event) => {
    const { name, value, type, checked } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')

    const endpoint = isEditing ? `${resource.endpoint}/${editingId}` : resource.endpoint
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const payload = await apiRequest(endpoint, {
        method,
        body: form,
      })

      if (!payload?.success) {
        throw new Error(payload?.error || payload?.message || 'Request failed')
      }

      setMessage(`${resource.singularLabel} ${isEditing ? 'updated' : 'created'} successfully`)
      resetForm(activeResource)
      await loadResource(activeResource)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  const onEdit = (item) => {
    const nextForm = {}

    resource.fields.forEach((field) => {
      if (field.type === 'checkbox') {
        nextForm[field.name] = Boolean(item[field.name])
        return
      }

      if (field.type === 'number') {
        nextForm[field.name] = Number(item[field.name] ?? 0)
        return
      }

      nextForm[field.name] = item[field.name] ?? ''
    })

    setEditingId(item._id)
    setForm(nextForm)
    setError('')
    setMessage(`Editing ${resource.singularLabel.toLowerCase()}`)
  }

  const onDelete = async (id) => {
    setError('')
    setMessage('')

    try {
      const payload = await apiRequest(`${resource.endpoint}/${id}`, {
        method: 'DELETE',
      })

      if (!payload?.success) {
        throw new Error(payload?.error || payload?.message || 'Delete failed')
      }

      if (editingId === id) {
        resetForm(activeResource)
      }

      setMessage(`${resource.singularLabel} deleted successfully`)
      await loadResource(activeResource)
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  if (authChecking) {
    return (
      <section className="mx-auto mt-28 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:mt-32 md:p-8">
        <p className="text-sm text-slate-600">Checking admin session...</p>
      </section>
    )
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto mt-28 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:mt-32 md:p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Login to manage services, work, testimonials, and FAQs.</p>

        <form className="mt-6 space-y-4" onSubmit={onLogin}>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Login
          </button>
        </form>
      </section>
    )
  }

  return (
    <section className="mx-auto mt-28 w-full max-w-7xl px-5 pb-20 md:mt-32 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-slate-600">Manage website content across all sections.</p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {Object.entries(RESOURCE_CONFIG).map(([resourceKey, resourceInfo]) => {
          const isActive = resourceKey === activeResource
          return (
            <button
              key={resourceKey}
              type="button"
              onClick={() => {
                setActiveResource(resourceKey)
                setMessage('')
                setError('')
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'border-black bg-black text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {resourceInfo.label}
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {isEditing ? `Edit ${resource.singularLabel}` : `Add ${resource.singularLabel}`}
          </h2>

          <div className="mt-4 grid gap-4">
            {resource.fields.map((field) => {
              if (field.type === 'checkbox') {
                return (
                  <label key={field.name} className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input type="checkbox" name={field.name} checked={Boolean(form[field.name])} onChange={onChangeField} />
                    {field.label}
                  </label>
                )
              }

              if (field.type === 'textarea') {
                return (
                  <label key={field.name} className="text-sm font-medium text-slate-700">
                    {field.label}
                    <textarea
                      name={field.name}
                      value={form[field.name] ?? ''}
                      onChange={onChangeField}
                      className="mt-1 min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2"
                      required={field.required}
                    />
                  </label>
                )
              }

              if (field.type === 'select') {
                return (
                  <label key={field.name} className="text-sm font-medium text-slate-700">
                    {field.label}
                    <select
                      name={field.name}
                      value={form[field.name] ?? ''}
                      onChange={onChangeField}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                      required={field.required}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                )
              }

              return (
                <label key={field.name} className="text-sm font-medium text-slate-700">
                  {field.label}
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name] ?? ''}
                    onChange={onChangeField}
                    min={field.min}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                    required={field.required}
                  />
                </label>
              )
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-70"
            >
              {submitting ? 'Saving...' : isEditing ? `Update ${resource.singularLabel}` : `Create ${resource.singularLabel}`}
            </button>

            {isEditing ? (
              <button
                type="button"
                onClick={() => {
                  resetForm(activeResource)
                  setMessage('Edit canceled')
                  setError('')
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>

          {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-xl font-semibold text-slate-900">Existing {resource.label}</h2>
          {loading ? <p className="mt-4 text-sm text-slate-500">Loading...</p> : null}

          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <article key={item._id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    {resource.previewFields.map((fieldName) => (
                      <p key={fieldName} className="text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">{fieldName}:</span> {String(item[fieldName] ?? '')}
                      </p>
                    ))}
                    <p className="pt-1 text-xs text-slate-500">
                      order: {item.order} | active: {String(item.isActive)}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item._id)}
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-700 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {!loading && items.length === 0 ? (
              <p className="text-sm text-slate-500">No {resource.label.toLowerCase()} found.</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminPanel
