'use client';

import { useState } from 'react';
import { LoginGate } from '@/components/LoginGate';
import { useFitnessStore } from '@/store/useFitnessStore';

export default function MedidasPage() {
  const addMedida = useFitnessStore((s) => s.addMedida);
  const [form, setForm] = useState({ braco: 35, peito: 100, cintura: 84, perna: 56 });
  const [ok, setOk] = useState(false);

  async function salvar() {
    await addMedida({ ...form, data: new Date().toISOString().slice(0, 10) });
    setOk(true);
  }

  return (
    <LoginGate>
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Medidas corporais</h1>
        <div className="card space-y-3">
          {(['braco', 'peito', 'cintura', 'perna'] as const).map((field) => (
            <input key={field} className="input" type="number" value={form[field]} onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })} placeholder={field} />
          ))}
          <button className="btn-primary" onClick={salvar}>Salvar medidas</button>
          {ok && <p className="text-sm text-emerald-600">Medidas salvas.</p>}
        </div>
      </section>
    </LoginGate>
  );
}
