"use client";
import {useState} from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Until NextAuth is wired, simulate success and navigate to the app shell.
    setMessage("Logged in (dev mode). Redirecting to dashboard…");
    setTimeout(() => {
      window.location.href = "/app/dashboard";
    }, 600);
  }

  return (
    <main className="mx-auto max-w-sm p-8">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-2 text-sm text-neutral-400">
        This development form does not authenticate yet. NextAuth is added later.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            required
            className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 p-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            required
            className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 p-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400"
        >
          Log In
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-neutral-300">{message}</p>}
    </main>
  );
}
