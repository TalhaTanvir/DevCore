import { AdminDashboard } from './components/AdminDashboard'
import { AdminLoginForm } from './components/AdminLoginForm'
import { AdminSessionState } from './components/AdminSessionState'
import { useAdminPanel } from './hooks/useAdminPanel'

function AdminPanel() {
  const adminPanel = useAdminPanel()

  if (adminPanel.authChecking) {
    return <AdminSessionState />
  }

  if (!adminPanel.isAuthenticated) {
    return (
      <AdminLoginForm
        email={adminPanel.email}
        password={adminPanel.password}
        error={adminPanel.error}
        onEmailChange={(event) => adminPanel.setEmail(event.target.value)}
        onPasswordChange={(event) => adminPanel.setPassword(event.target.value)}
        onSubmit={adminPanel.onLogin}
      />
    )
  }

  return (
    <AdminDashboard
      resources={adminPanel.resources}
      activeResource={adminPanel.activeResource}
      resource={adminPanel.resource}
      items={adminPanel.items}
      dashboardStats={adminPanel.dashboardStats}
      form={adminPanel.form}
      loading={adminPanel.loading}
      submitting={adminPanel.submitting}
      message={adminPanel.message}
      error={adminPanel.error}
      isEditing={adminPanel.isEditing}
      onLogout={adminPanel.onLogout}
      onResourceChange={adminPanel.onResourceChange}
      onChangeField={adminPanel.onChangeField}
      onSubmit={adminPanel.onSubmit}
      onCancelEdit={adminPanel.onCancelEdit}
      onEdit={adminPanel.onEdit}
      onDelete={adminPanel.onDelete}
    />
  )
}

export default AdminPanel
