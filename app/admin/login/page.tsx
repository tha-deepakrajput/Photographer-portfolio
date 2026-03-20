"use client";

import { useState } from "react";
import { handleLogin } from "@/app/admin/actions";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);

  const clientAction = async (formData: FormData) => {
    const res = await handleLogin(formData);
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light tracking-widest text-white uppercase mb-2">
            Admin Access
          </h1>
          <p className="text-neutral-500">Secure portfolio management</p>
        </div>

        <form action={clientAction} className="space-y-6">
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-white text-black font-medium tracking-wide rounded-lg px-4 py-3 hover:bg-neutral-200 transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
