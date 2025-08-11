export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-neutral-800/70 bg-neutral-950/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-semibold tracking-tight">Hulkastorus</div>
          <ul className="flex items-center gap-6 text-sm text-neutral-300">
            <li>
              <a className="hover:text-white" href="/docs">
                Docs
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="#pricing">
                Pricing
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="/login">
                Login
              </a>
            </li>
            <li>
              <a
                className="rounded-md bg-emerald-500 px-3 py-1.5 font-medium text-black hover:bg-emerald-400"
                href="mailto:invites@hulkastor.us"
              >
                Request Invite
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-20 sm:grid-cols-2" data-testid="hero">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl" data-testid="headline">
            Dev-Friendly Cloud Storage, Hulk-Strong.
          </h1>
          <p className="mt-4 max-w-prose text-neutral-300" data-testid="tagline">
            Instant public URLs and frictionless curl uploads — without SDKs, buckets, or OAuth pain.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400"
              href="mailto:invites@hulkastor.us"
            >
              Request Invite
            </a>
            <a className="rounded-md border border-neutral-800 px-4 py-2 hover:border-neutral-700" href="/docs">
              Read the Docs
            </a>
          </div>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <pre className="overflow-x-auto text-sm leading-relaxed">
            <code>
{`# Upload a file with curl
curl -X POST https://api.hulkastor.us/api/v1/files \
  -H "Authorization: Bearer $HULK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"path":"/models/model.ckpt"}'

# Receive upload URL and PUT contents
curl -X PUT "<upload_url>" --data-binary @model.ckpt

# Copy public link
https://hulk.st/or/us/abc123`}
            </code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Features">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <h3 className="font-semibold">One-Command Share</h3>
            <p className="mt-1 text-sm text-neutral-300">Ship files with curl; link auto-copied.</p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <h3 className="font-semibold">Keyless CI Friendly</h3>
            <p className="mt-1 text-sm text-neutral-300">SSO and short-lived tokens, no SDKs.</p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <h3 className="font-semibold">ML-Asset Ready</h3>
            <p className="mt-1 text-sm text-neutral-300">Multipart uploads and integrity checks.</p>
          </div>
        </div>
      </section>

      {/* Logo carousel (placeholder) */}
      <section className="mx-auto max-w-6xl px-4 py-8 text-center text-neutral-500" aria-label="Customers">
        Hooli • Pied Piper • Enron • Theranos • Massive Dynamic
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16" aria-label="Pricing">
        <h2 className="text-2xl font-bold">Pricing</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Free", "Pro", "Tres Commas"].map((plan) => (
            <div key={plan} className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
              <h3 className="text-lg font-semibold">{plan}</h3>
              <p className="mt-2 text-sm text-neutral-300">$0 (beta)</p>
              <button className="mt-4 w-full rounded-md border border-neutral-700 px-3 py-2 text-sm hover:border-neutral-600">
                {plan === "Free" ? "Get Free" : plan === "Pro" ? "Join Waitlist" : "Contact Sales"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/70 py-8 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Hulkastorus • Privacy • Terms
      </footer>
    </div>
  );
}
