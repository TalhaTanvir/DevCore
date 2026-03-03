import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../../lib/apiClient'
import { DEFAULT_RESOURCE_KEY, RESOURCE_CONFIG } from '../constants/resourceConfig'

const buildFormFromItem = (item, fields) => {
  const nextForm = {}

  fields.forEach((field) => {
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

  return nextForm
}

export function useAdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeResource, setActiveResource] = useState(DEFAULT_RESOURCE_KEY)
  const [items, setItems] = useState([])
  const [form, setForm] = useState(RESOURCE_CONFIG[DEFAULT_RESOURCE_KEY].emptyForm)
  const [editingId, setEditingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [dashboardStats, setDashboardStats] = useState({
    totalResources: 0,
    totalItems: 0,
    totalLiveItems: 0,
    byResource: {},
  })

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

  const loadDashboardStats = useCallback(async () => {
    try {
      const entries = Object.entries(RESOURCE_CONFIG)
      const stats = await Promise.all(
        entries.map(async ([resourceKey, config]) => {
          try {
            const payload = await apiRequest(config.endpoint)
            const data = Array.isArray(payload?.data) ? payload.data : []
            const live = data.filter((item) => Boolean(item.isActive)).length

            return [
              resourceKey,
              {
                label: config.label,
                total: data.length,
                live,
              },
            ]
          } catch {
            return [
              resourceKey,
              {
                label: config.label,
                total: 0,
                live: 0,
              },
            ]
          }
        }),
      )

      const byResource = Object.fromEntries(stats)
      const totalItems = Object.values(byResource).reduce((sum, item) => sum + item.total, 0)
      const totalLiveItems = Object.values(byResource).reduce((sum, item) => sum + item.live, 0)

      setDashboardStats({
        totalResources: entries.length,
        totalItems,
        totalLiveItems,
        byResource,
      })
    } catch {
      setDashboardStats({
        totalResources: Object.keys(RESOURCE_CONFIG).length,
        totalItems: 0,
        totalLiveItems: 0,
        byResource: {},
      })
    }
  }, [])

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
    loadDashboardStats()
    resetForm(activeResource)
  }, [isAuthenticated, activeResource, loadResource, loadDashboardStats, resetForm])

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
      await loadDashboardStats()
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  const onEdit = (item) => {
    setEditingId(item._id)
    setForm(buildFormFromItem(item, resource.fields))
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
      await loadDashboardStats()
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  const onResourceChange = (resourceKey) => {
    setActiveResource(resourceKey)
    setMessage('')
    setError('')
  }

  const onCancelEdit = () => {
    resetForm(activeResource)
    setMessage('Edit canceled')
    setError('')
  }

  return {
    resources: RESOURCE_CONFIG,
    resource,
    isAuthenticated,
    authChecking,
    email,
    password,
    activeResource,
    items,
    form,
    loading,
    submitting,
    message,
    error,
    dashboardStats,
    isEditing,
    setEmail,
    setPassword,
    onLogin,
    onLogout,
    onChangeField,
    onSubmit,
    onEdit,
    onDelete,
    onResourceChange,
    onCancelEdit,
  }
}
