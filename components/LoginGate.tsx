'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useFitnessStore } from '@/store/useFitnessStore';

export function LoginGate({ children }: { children: React.ReactNode }) {
  const user = useFitnessStore((s) => s.user);
  const setUser = useFitnessStore((s) => s.setUser);
  const loadFromSupabase = useFitnessStore((s) => s.loadFromSupabase);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) loadFromSupabase().catch(() => undefined);
  }, [user, loadFromSupabase]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await setUser({ nome, telefone });
    setLoading(false);
  }

  if (user) return <>{children}</>;

  return (
    <section className="space-y-6 pt-10">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">GymFlow Premium</h1>
        <p className="text-sm text-slate-500">Login rápido para começar seu acompanhamento diário.</p>
      </header>
      <form onSubmit={handleSubmit} className="card space-y-4">
        <input className="input" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input className="input" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        <button disabled={loading} className="btn-primary">{loading ? 'Entrando...' : 'Entrar sem senha'}</button>
      </form>
    </section>
  );
}
