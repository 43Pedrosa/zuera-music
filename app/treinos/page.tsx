'use client';

import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { LoginGate } from '@/components/LoginGate';
import { useFitnessStore } from '@/store/useFitnessStore';

export default function TreinosPage() {
  const workouts = useFitnessStore((s) => s.workouts);
  const addWorkout = useFitnessStore((s) => s.addWorkout);
  const toggleSetDone = useFitnessStore((s) => s.toggleSetDone);

  const [nome, setNome] = useState('A');
  const [exercicio, setExercicio] = useState('Supino reto');
  const [series, setSeries] = useState(4);
  const [reps, setReps] = useState(10);
  const [carga, setCarga] = useState(40);
  const [descanso, setDescanso] = useState(90);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (timer === null || timer <= 0) return;
    const id = setInterval(() => setTimer((t) => (t ?? 1) - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  return (
    <LoginGate>
      <section className="space-y-4 pb-10">
        <h1 className="text-2xl font-bold">Treinos</h1>
        <div className="card space-y-2">
          <input className="input" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Treino (A/B/C)" />
          <input className="input" value={exercicio} onChange={(e) => setExercicio(e.target.value)} placeholder="Exercício" />
          <div className="grid grid-cols-3 gap-2">
            <input className="input" type="number" value={series} onChange={(e) => setSeries(Number(e.target.value))} placeholder="Séries" />
            <input className="input" type="number" value={reps} onChange={(e) => setReps(Number(e.target.value))} placeholder="Reps" />
            <input className="input" type="number" value={carga} onChange={(e) => setCarga(Number(e.target.value))} placeholder="Carga" />
          </div>
          <input className="input" type="number" value={descanso} onChange={(e) => setDescanso(Number(e.target.value))} placeholder="Descanso (s)" />
          <button
            className="btn-primary"
            onClick={() => addWorkout({ nome, exercicio, data: new Date().toISOString().slice(0, 10), descansoSeg: descanso, sets: Array.from({ length: series }, () => ({ series: 1, reps, carga, concluida: false })) })}
          >
            Criar treino
          </button>
        </div>

        {timer !== null && <div className="card text-center text-lg font-semibold">Descanso: {Math.max(timer, 0)}s</div>}

        <div className="space-y-3">
          {workouts.map((w) => (
            <article key={w.id} className="card space-y-2">
              <p className="font-semibold">Treino {w.nome} · {w.exercicio}</p>
              <p className="text-xs text-slate-500">Último treino: {w.data} · Referência {w.sets[0]?.carga}kg x {w.sets[0]?.reps}</p>
              {w.sets.map((s, index) => (
                <button key={index} onClick={() => { toggleSetDone(w.id, index); setTimer(w.descansoSeg); }} className={s.concluida ? 'btn-primary' : 'btn-secondary'}>
                  Série {index + 1}: {s.carga}kg x {s.reps} {s.concluida ? '✓' : ''}
                </button>
              ))}
            </article>
          ))}
        </div>
      </section>
      <BottomNav />
    </LoginGate>
  );
}
