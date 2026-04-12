'use client';

import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';
import { LoginGate } from '@/components/LoginGate';
import { SimpleLineChart } from '@/components/SimpleLineChart';
import { feedbackMessage, leanMass, scoreLabel, sevenDayVariation, streakCount, dayScore } from '@/lib/calculations';
import { useFitnessStore } from '@/store/useFitnessStore';

export default function DashboardPage() {
  const user = useFitnessStore((s) => s.user);
  const checkins = useFitnessStore((s) => s.checkins).sort((a, b) => a.data.localeCompare(b.data));

  const latest = checkins.at(-1);
  const pesoAtual = latest?.peso ?? 0;
  const gordura = latest?.gordura ?? 0;
  const massaMagra = latest ? leanMass(latest.peso, latest.gordura) : 0;
  const score = latest ? dayScore(latest) : 0;

  return (
    <LoginGate>
      <div className="space-y-4 pb-5">
        <header className="space-y-1">
          <p className="text-sm text-slate-500">Fala, {user?.nome} 👋</p>
          <h1 className="text-2xl font-bold">Dashboard de evolução</h1>
        </header>

        <section className="grid grid-cols-2 gap-3">
          <article className="card"><p className="text-xs text-slate-500">Peso atual</p><p className="text-xl font-bold">{pesoAtual.toFixed(1)} kg</p></article>
          <article className="card"><p className="text-xs text-slate-500">Variação 7 dias</p><p className="text-xl font-bold">{sevenDayVariation(checkins)} kg</p></article>
          <article className="card"><p className="text-xs text-slate-500">% gordura</p><p className="text-xl font-bold">{gordura.toFixed(1)}%</p></article>
          <article className="card"><p className="text-xs text-slate-500">Massa magra</p><p className="text-xl font-bold">{massaMagra.toFixed(1)} kg</p></article>
        </section>

        <section className="card space-y-2">
          <p className="text-sm text-slate-500">Score do dia</p>
          <p className="text-3xl font-bold">{score} · {scoreLabel(score)}</p>
          <p className="text-sm text-slate-500">🔥 Streak: {streakCount(checkins)} dias</p>
          <p className="rounded-xl bg-slate-50 p-3 text-sm">{feedbackMessage(checkins)}</p>
        </section>

        <section className="card space-y-2">
          <p className="text-sm font-semibold">Gráfico de peso</p>
          <SimpleLineChart
            values={checkins.map((c) => c.peso)}
            labels={checkins.map((c) => c.data.slice(5))}
          />
        </section>

        <Link href="/checkin" className="btn-primary block text-center">Registrar hoje</Link>
      </div>
      <BottomNav />
    </LoginGate>
  );
}
