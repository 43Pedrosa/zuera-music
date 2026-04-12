'use client';

import { useMemo, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { LoginGate } from '@/components/LoginGate';
import { SimpleLineChart } from '@/components/SimpleLineChart';
import { leanMass } from '@/lib/calculations';
import { useFitnessStore } from '@/store/useFitnessStore';

export default function ProgressoPage() {
  const [filtro, setFiltro] = useState(30);
  const checkins = useFitnessStore((s) => s.checkins);
  const medidas = useFitnessStore((s) => s.medidas);

  const cutoff = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - filtro);
    return d.toISOString().slice(0, 10);
  }, [filtro]);

  const c = checkins.filter((item) => item.data >= cutoff).sort((a, b) => a.data.localeCompare(b.data));
  const m = medidas.filter((item) => item.data >= cutoff).sort((a, b) => a.data.localeCompare(b.data));

  return (
    <LoginGate>
      <section className="space-y-4 pb-8">
        <h1 className="text-2xl font-bold">Progresso</h1>
        <div className="grid grid-cols-3 gap-2">
          {[7, 30, 90].map((d) => (
            <button key={d} onClick={() => setFiltro(d)} className={filtro === d ? 'btn-primary' : 'btn-secondary'}>{d === 90 ? '3 meses' : `${d} dias`}</button>
          ))}
        </div>

        <article className="card"><p className="mb-2 text-sm font-semibold">Peso</p><SimpleLineChart values={c.map((x) => x.peso)} labels={c.map((x) => x.data.slice(5))} /></article>
        <article className="card"><p className="mb-2 text-sm font-semibold">Gordura corporal</p><SimpleLineChart values={c.map((x) => x.gordura)} labels={c.map((x) => x.data.slice(5))} color="#334155" /></article>
        <article className="card"><p className="mb-2 text-sm font-semibold">Massa magra</p><SimpleLineChart values={c.map((x) => leanMass(x.peso, x.gordura))} labels={c.map((x) => x.data.slice(5))} color="#16a34a" /></article>

        <article className="card">
          <p className="mb-2 text-sm font-semibold">Medidas corporais</p>
          <SimpleLineChart values={m.map((x) => x.braco)} labels={m.map((x) => x.data.slice(5))} color="#0284c7" />
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
            <p>Peito: {m.at(-1)?.peito ?? '-'} cm</p>
            <p>Cintura: {m.at(-1)?.cintura ?? '-'} cm</p>
            <p>Perna: {m.at(-1)?.perna ?? '-'} cm</p>
            <p>Braço: {m.at(-1)?.braco ?? '-'} cm</p>
          </div>
        </article>
      </section>
      <BottomNav />
    </LoginGate>
  );
}
