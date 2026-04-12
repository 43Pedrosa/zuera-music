'use client';

import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';
import { LoginGate } from '@/components/LoginGate';
import { useFitnessStore } from '@/store/useFitnessStore';

export default function ConfiguracoesPage() {
  const user = useFitnessStore((s) => s.user);
  const clear = () => {
    localStorage.removeItem('gymflow-session');
    window.location.reload();
  };

  return (
    <LoginGate>
      <section className="space-y-4 pb-8">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <article className="card space-y-2 text-sm">
          <p><strong>Nome:</strong> {user?.nome}</p>
          <p><strong>Telefone:</strong> {user?.telefone}</p>
          <p><strong>Banco:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Supabase ativo' : 'Supabase não configurado (modo local)'}</p>
        </article>
        <Link href="/medidas" className="btn-secondary block text-center">Registrar medidas corporais</Link>
        <button className="btn-primary" onClick={clear}>Sair</button>
      </section>
      <BottomNav />
    </LoginGate>
  );
}
