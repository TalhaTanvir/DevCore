export function AdminSessionState() {
  return (
    <section className="grid min-h-screen place-items-center bg-white p-4 text-black">
      <div className="w-full max-w-sm rounded-xl border border-black bg-white p-8 text-center">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-black/30 border-t-black" />
        <p className="mt-3 text-sm text-black/70">Checking admin session...</p>
      </div>
    </section>
  )
}
