import { Checkin } from './types';

export const leanMass = (peso: number, gordura: number) => peso * (1 - gordura / 100);

export function dayScore(checkin: Checkin) {
  return Number(checkin.treinou) + Number(checkin.alimentacao_ok) + Number(checkin.sono > 7) + 1;
}

export function scoreLabel(score: number) {
  if (score <= 1) return 'Ruim';
  if (score <= 3) return 'Médio';
  return 'Excelente';
}

export function sevenDayVariation(checkins: Checkin[]) {
  if (checkins.length < 2) return 0;
  const ordered = [...checkins].sort((a, b) => a.data.localeCompare(b.data));
  const last = ordered.at(-1)?.peso ?? 0;
  const from7 = ordered[Math.max(0, ordered.length - 7)]?.peso ?? ordered[0].peso;
  return Number((last - from7).toFixed(2));
}

export function streakCount(checkins: Checkin[]) {
  const days = [...checkins]
    .sort((a, b) => b.data.localeCompare(a.data))
    .map((item) => ({ date: item.data, score: dayScore(item) }));

  let streak = 0;
  const cursor = new Date();

  for (const d of days) {
    const dateKey = cursor.toISOString().slice(0, 10);
    if (d.date !== dateKey) {
      if (streak === 0) {
        cursor.setDate(cursor.getDate() - 1);
        if (d.date !== cursor.toISOString().slice(0, 10)) break;
      } else {
        break;
      }
    }
    if (d.score >= 3) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function feedbackMessage(checkins: Checkin[]) {
  if (!checkins.length) return 'Comece seu check-in e acompanhe sua evolução diária.';
  const latest = [...checkins].sort((a, b) => b.data.localeCompare(a.data))[0];
  const score = dayScore(latest);

  if (score === 4) return 'Você está evoluindo 🔥';
  if (checkins.slice(-3).filter((c) => c.treinou).length >= 3) return '3 dias seguidos treinando';

  const sorted = [...checkins].sort((a, b) => a.data.localeCompare(b.data));
  if (sorted.length > 1) {
    const prev = sorted[sorted.length - 2];
    if (latest.peso < prev.peso && leanMass(latest.peso, latest.gordura) > leanMass(prev.peso, prev.gordura)) {
      return 'Seu peso caiu e a massa magra subiu';
    }
  }

  return 'Consistência vence intensidade. Continue!';
}
