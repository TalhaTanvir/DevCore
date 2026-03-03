import { useMemo, useState } from 'react'
import {
  Bell,
  BriefcaseBusiness,
  CircleHelp,
  Gauge,
  LogOut,
  MessageSquareQuote,
  PenLine,
  Plus,
  Settings,
  Search,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { cn } from '../../lib/utils'
import { AdminResourceForm } from './AdminResourceForm'

const RESOURCE_ICON_MAP = {
  services: BriefcaseBusiness,
  work: Gauge,
  testimonials: MessageSquareQuote,
  faqs: CircleHelp,
}

const CARD_CONFIG = [
  {
    key: 'services',
    title: 'Total Services',
  },
  {
    key: 'work',
    title: 'Total Projects',
  },
  {
    key: 'testimonials',
    title: 'Testimonials',
  },
  {
    key: 'faqs',
    title: 'Total FAQs',
  },
]

const toImageUrl = (value) => {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  const cssUrl = trimmed.match(/^url\((['"]?)(.+)\1\)$/i)
  if (cssUrl?.[2]) return cssUrl[2]
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return ''
}

const cropText = (value, max = 52) => {
  const normalized = String(value ?? '').trim()
  if (normalized.length <= max) return normalized
  return `${normalized.slice(0, max - 3)}...`
}

const normalizeRow = (item, resourceKey) => {
  if (resourceKey === 'services') {
    return {
      id: item._id,
      image: '',
      name: item.title || 'Untitled service',
      category: cropText(item.icon || 'Service'),
      stack: cropText(item.description || ''),
      featured: Boolean(item.isActive),
      source: item,
    }
  }

  if (resourceKey === 'testimonials') {
    return {
      id: item._id,
      image: item.avatar || '',
      name: item.name || 'Untitled testimonial',
      category: cropText(item.role || 'Client'),
      stack: cropText(item.quote || ''),
      featured: Boolean(item.isActive),
      source: item,
    }
  }

  if (resourceKey === 'faqs') {
    return {
      id: item._id,
      image: '',
      name: item.question || 'Untitled FAQ',
      category: cropText(item.key || 'General'),
      stack: cropText(item.answer || ''),
      featured: Boolean(item.isActive),
      source: item,
    }
  }

  return {
    id: item._id,
    image: toImageUrl(item.image),
    name: item.title || item.key || 'Untitled project',
    category: cropText(item.category || 'Project'),
    stack: cropText(item.subtitle || item.key || ''),
    featured: Boolean(item.isActive),
    source: item,
  }
}

export function AdminDashboard({
  resources,
  activeResource,
  resource,
  items,
  dashboardStats,
  form,
  loading,
  submitting,
  message,
  error,
  isEditing,
  onLogout,
  onResourceChange,
  onChangeField,
  onSubmit,
  onCancelEdit,
  onEdit,
  onDelete,
}) {
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [activeNavKey, setActiveNavKey] = useState('dashboard')
  const byResource = dashboardStats.byResource ?? {}
  const dashboardResourceKey = resources.work ? 'work' : activeResource

  const navItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: Gauge,
      isActive: activeNavKey === 'dashboard',
      onClick: () => {
        setActiveNavKey('dashboard')
        setIsComposerOpen(false)
        onResourceChange(dashboardResourceKey)
      },
    },
    {
      key: 'services',
      label: resources.services?.label || 'Services',
      icon: BriefcaseBusiness,
      isActive: activeNavKey === 'services',
      onClick: () => {
        setActiveNavKey('services')
        setIsComposerOpen(false)
        onResourceChange('services')
      },
    },
    {
      key: 'projects',
      label: 'Projects',
      icon: Gauge,
      isActive: activeNavKey === 'projects',
      onClick: () => {
        setActiveNavKey('projects')
        setIsComposerOpen(false)
        onResourceChange('work')
      },
    },
    {
      key: 'testimonials',
      label: resources.testimonials?.label || 'Testimonials',
      icon: MessageSquareQuote,
      isActive: activeNavKey === 'testimonials',
      onClick: () => {
        setActiveNavKey('testimonials')
        setIsComposerOpen(false)
        onResourceChange('testimonials')
      },
    },
    {
      key: 'faqs',
      label: resources.faqs?.label || 'FAQ',
      icon: CircleHelp,
      isActive: activeNavKey === 'faqs',
      onClick: () => {
        setActiveNavKey('faqs')
        setIsComposerOpen(false)
        onResourceChange('faqs')
      },
    },
  ]

  const statCards = CARD_CONFIG.map((card) => {
    const stats = byResource[card.key] ?? { total: 0, live: 0 }
    const Icon = RESOURCE_ICON_MAP[card.key] ?? Sparkles
    return {
      ...card,
      Icon,
      value: stats.total,
      delta: `+${stats.live}`,
      deltaLabel: card.key === 'testimonials' ? 'approved' : 'active',
    }
  })

  const tableRows = useMemo(() => items.map((item) => normalizeRow(item, activeResource)), [items, activeResource])

  const openCreateComposer = () => {
    if (isEditing) {
      onCancelEdit()
    }
    setIsComposerOpen(true)
  }

  const closeComposer = () => {
    if (isEditing) {
      onCancelEdit()
    }
    setIsComposerOpen(false)
  }

  const tableTitle = activeResource === 'work' ? 'Recent Projects' : `Recent ${resource.label}`
  const tableNameLabel = activeResource === 'work' ? 'Project Name' : 'Item Name'
  const tableCategoryLabel = activeResource === 'work' ? 'Category' : 'Type'
  const tableStackLabel = activeResource === 'work' ? 'Tech Stack' : 'Details'

  return (
    <section className="min-h-screen bg-white text-black">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[250px_1fr]">
        <aside className="flex flex-col border-r border-black bg-black p-4 text-white">
          <div className="rounded-lg border border-white/40 bg-black px-3 py-2">
            <p className="text-base font-semibold tracking-tight text-white">AgencyPro</p>
            <p className="text-xs text-white/70">Admin Workspace</p>
          </div>

          <nav className="mt-5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.key}
                  onClick={item.onClick}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start text-sm',
                    item.isActive
                      ? 'bg-white text-black hover:bg-white hover:text-black'
                      : 'text-white hover:bg-white hover:text-black',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          <div className="mt-auto space-y-1 border-t border-white/30 pt-4">
            <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-white hover:text-black">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start text-sm text-white hover:bg-white hover:text-black"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-black bg-black px-4 py-3 text-white md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Control Center</p>
                <h1 className="text-xl font-semibold tracking-tight text-white">Admin Panel</h1>
              </div>

              <div className="flex w-full items-center gap-2 md:w-auto">
                <div className="relative w-full md:w-72">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/70" />
                  <Input
                    type="search"
                    aria-label="Search"
                    placeholder="Search..."
                    className="h-9 border-white/40 bg-black pl-8 text-white placeholder:text-white/70 focus:border-white focus:ring-white/20"
                  />
                </div>
                <Button variant="outline" size="icon" className="border-white bg-black text-white hover:bg-white hover:text-black">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-5 bg-white p-4 md:p-6">
            {activeNavKey === 'dashboard' ? (
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map((card) => (
                  <Card key={card.key} className="border-black bg-white text-black">
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2 text-xs text-black/70">
                        <span className="rounded-md border border-black bg-white p-1">
                          <card.Icon className="h-3 w-3 text-black" />
                        </span>
                        {card.title}
                      </CardDescription>
                      <CardTitle className="text-3xl text-black">{card.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="border-black bg-white text-black">
                        <span className="font-semibold">{card.delta}</span>&nbsp;{card.deltaLabel}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </section>
            ) : null}

            <Card className="border-black bg-white text-black">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg text-black">{tableTitle}</CardTitle>
                  <CardDescription className="text-black/70">{resource.label} list with quick actions.</CardDescription>
                </div>
                <Button onClick={openCreateComposer} className="bg-black text-white hover:bg-white hover:text-black">
                  <Plus className="h-4 w-4" />
                  Add {resource.singularLabel}
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Image</TableHead>
                      <TableHead>{tableNameLabel}</TableHead>
                      <TableHead>{tableCategoryLabel}</TableHead>
                      <TableHead>{tableStackLabel}</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-black/70">
                          Loading {resource.label.toLowerCase()}...
                        </TableCell>
                      </TableRow>
                    ) : null}

                    {!loading && tableRows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-black/70">
                          No {resource.label.toLowerCase()} found.
                        </TableCell>
                      </TableRow>
                    ) : null}

                    {!loading
                      ? tableRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              {row.image ? (
                                <img
                                  src={row.image}
                                  alt={row.name}
                                  className="h-12 w-20 rounded-md border border-black/40 object-cover"
                                />
                              ) : (
                                <div className="flex h-12 w-20 items-center justify-center rounded-md border border-black/40 bg-white text-black/70">
                                  <Sparkles className="h-4 w-4" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="font-medium text-black">{row.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-black/40 bg-white text-black">
                                {row.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="max-w-56 truncate border-black/40 bg-white text-black">
                                {row.stack}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span
                                className={cn(
                                  'inline-flex h-7 w-7 items-center justify-center rounded-full border',
                                  row.featured
                                    ? 'border-black bg-black text-white'
                                    : 'border-black/40 bg-white text-black/60',
                                )}
                              >
                                <Star className="h-4 w-4" fill={row.featured ? 'currentColor' : 'none'} />
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    onEdit(row.source)
                                    setIsComposerOpen(true)
                                  }}
                                  className="border-black bg-white text-black hover:bg-black hover:text-white"
                                >
                                  <PenLine className="h-3.5 w-3.5" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => onDelete(row.id)}
                                  className="border-black bg-white text-black hover:bg-black hover:text-white"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {message ? (
              <p className="rounded-md border border-black bg-white px-3 py-2 text-sm text-black">{message}</p>
            ) : null}
            {error ? <p className="rounded-md border border-black bg-black px-3 py-2 text-sm text-white">{error}</p> : null}
          </main>
        </div>
      </div>

      {isComposerOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4" role="dialog" aria-modal="true">
          <section className="w-full max-w-4xl rounded-xl border border-black bg-white text-black shadow-2xl">
            <header className="flex items-center justify-between border-b border-black/20 px-6 py-4">
              <h2 className="text-base font-semibold">{isEditing ? `Edit ${resource.singularLabel}` : `Add ${resource.singularLabel}`}</h2>
              <Button
                variant="outline"
                size="icon"
                onClick={closeComposer}
                className="h-8 w-8 border-black bg-white text-black hover:bg-black hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </header>

            <AdminResourceForm
              resource={resource}
              form={form}
              submitting={submitting}
              isEditing={isEditing}
              message={message}
              error={error}
              onChangeField={onChangeField}
              onSubmit={onSubmit}
              onCancelEdit={onCancelEdit}
              onClose={closeComposer}
            />
          </section>
        </div>
      ) : null}
    </section>
  )
}
