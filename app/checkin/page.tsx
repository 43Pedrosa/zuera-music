'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { LoginGate } from '@/components/LoginGate';
import { useFitnessStore } from '@/store/useFitnessStore';

const today = new Date().toISOString().slice(0, 10);

export default function CheckinPage() {
  const addCheckin = useFitnessStore((s) => s.addCheckin);
  const [form, setForm] = useState({ peso: 80, gordura: 20, energia: 3, sono: 7, treinou: true, alimentacao_ok: true, calorias: 2200, proteina: 160 });
  const [status, setStatus] = useState('');

  async function submit() {
    await addCheckin({ ...form, data: today });
    setStatus('Check-in salvo com sucesso.');
  }

  return (
    <LoginGate>
      <section className="space-y-4 pb-8">
        <h1 className="text-2xl font-bold">Check-in diário</h1>
        <p className="text-sm text-slate-500">Preencha em menos de 10 segundos.</p>

        <div className="card space-y-3">
          <input type="number" className="input" value={form.peso} onChange={(e) => setForm({ ...form, peso: Number(e.target.value) })} placeholder="Peso" />
          <input type="number" className="input" value={form.gordura} onChange={(e) => setForm({ ...form, gordura: Number(e.target.value) })} placeholder="% Gordura" />
          <label className="text-sm">Energia: {form.energia}
            <input type="range" min={1} max={5} value={form.energia} onChange={(e) => setForm({ ...form, energia: Number(e.target.value) })} className="w-full" />
          </label>
          <input type="number" className="input" value={form.sono} onChange={(e) => setForm({ ...form, sono: Number(e.target.value) })} placeholder="Sono (horas)" />
          <input type="number" className="input" value={form.calorias} onChange={(e) => setForm({ ...form, calorias: Number(e.target.value) })} placeholder="Calorias do dia" />
          <input type="number" className="input" value={form.proteina} onChange={(e) => setForm({ ...form, proteina: Number(e.target.value) })} placeholder="Proteína (g)" />
          <div className="grid grid-cols-2 gap-2">
            <button className={form.treinou ? 'btn-primary' : 'btn-secondary'} onClick={() => setForm({ ...form, treinou: true })}>Treinou</button>
            <button className={!form.treinou ? 'btn-primary' : 'btn-secondary'} onClick={() => setForm({ ...form, treinou: false })}>Não treinou</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className={form.alimentacao_ok ? 'btn-primary' : 'btn-secondary'} onClick={() => setForm({ ...form, alimentacao_ok: true })}>Alimentação ok</button>
            <button className={!form.alimentacao_ok ? 'btn-primary' : 'btn-secondary'} onClick={() => setForm({ ...form, alimentacao_ok: false })}>Fora da meta</button>
          </div>
          <button onClick={submit} className="btn-primary">Salvar check-in</button>
          {status && <p className="text-sm text-emerald-600">{status}</p>}
        </div>
      </section>
      <BottomNav />
    </LoginGate>
  );
}
