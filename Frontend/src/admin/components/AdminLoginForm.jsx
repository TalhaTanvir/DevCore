import { LockKeyhole, ShieldCheck } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

export function AdminLoginForm({ email, password, error, onEmailChange, onPasswordChange, onSubmit }) {
  return (
    <section className="min-h-screen bg-white px-4 py-8 text-black">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-2xl border border-black bg-white shadow-2xl lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-black bg-black p-6 text-white lg:border-b-0 lg:border-r">
          <div className="inline-flex items-center gap-2 rounded-md border border-white bg-black px-2.5 py-1 text-sm font-medium text-white">
            <ShieldCheck className="h-4 w-4 text-white" />
            AgencyPro
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Admin Panel</h1>
          <p className="mt-2 text-sm text-white/80">Shadcn-style control center for projects, services, testimonials, and FAQs.</p>
        </aside>

        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-md border-black bg-white text-black">
            <CardHeader>
              <CardTitle className="text-xl">Welcome Back</CardTitle>
              <CardDescription className="text-black/70">Enter your admin credentials to continue.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-1.5">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={onEmailChange}
                    required
                    className="border-black/40 bg-white text-black placeholder:text-black/50 focus:border-black focus:ring-black/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                    required
                    className="border-black/40 bg-white text-black placeholder:text-black/50 focus:border-black focus:ring-black/20"
                  />
                </div>

                {error ? <p className="rounded-md border border-black bg-black px-3 py-2 text-sm text-white">{error}</p> : null}

                <Button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black">
                  <LockKeyhole className="h-4 w-4" />
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
