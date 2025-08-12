"use client";
import {useState} from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    inviteCode: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          firstName: form.firstName || undefined,
          lastName: form.lastName || undefined,
          email: form.email,
          password: form.password,
          inviteCode: form.inviteCode || undefined,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || res.statusText);
      setMessage("Account created. You can now log in.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "unknown error";
      setMessage(`Failed to register: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg p-8">
      <h1 className="text-2xl font-semibold">Register</h1>
      <p className="mt-2 text-sm text-neutral-400">
        This development form creates a user via the API. Authentication is configured later.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">First Name</label>
            <input
              className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 p-2 text-sm"
              value={form.firstName}
              onChange={(e) => setForm({...form, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm">Last Name</label>
            <input
              className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 p-2 text-sm"
              value={form.lastName}
              onChange={(e) => setForm({...form, lastName: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            required
            className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 p-2 text-sm"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 p-2 text-sm"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm">Confirm</label>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 p-2 text-sm"
              value={form.confirm}
              onChange={(e) => setForm({...form, confirm: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm">Invite Code</label>
          <input
            className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 p-2 text-sm"
            value={form.inviteCode}
            onChange={(e) => setForm({...form, inviteCode: e.target.value})}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
        >
          {submitting ? "Creating…" : "Create Account"}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-neutral-300">{message}</p>}
    </main>
  );
}
