'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Checkin, Medida, User, Workout } from '@/lib/types';
import { db } from '@/lib/supabase';

const uid = () => crypto.randomUUID();

type FitnessState = {
  user: User | null;
  checkins: Checkin[];
  medidas: Medida[];
  workouts: Workout[];
  setUser: (payload: Omit<User, 'id'>) => Promise<void>;
  addCheckin: (payload: Omit<Checkin, 'id' | 'user_id'>) => Promise<void>;
  addMedida: (payload: Omit<Medida, 'id' | 'user_id'>) => Promise<void>;
  addWorkout: (payload: Omit<Workout, 'id'>) => void;
  toggleSetDone: (workoutId: string, setIndex: number) => void;
  loadFromSupabase: () => Promise<void>;
};

export const useFitnessStore = create<FitnessState>()(
  persist(
    (set, get) => ({
      user: null,
      checkins: [],
      medidas: [],
      workouts: [],
      async setUser(payload) {
        const created: User = { id: uid(), ...payload };

        if (db.isReady) {
          const res = await db.supabaseRequest(`users?telefone=eq.${encodeURIComponent(payload.telefone)}&select=*`);
          const existing = (res as User[] | null)?.[0];
          if (existing) {
            set({ user: existing });
            return;
          }

          const inserted = await db.supabaseRequest('users', {
            method: 'POST',
            body: JSON.stringify([created])
          });
          set({ user: (inserted as User[])[0] });
          return;
        }

        set({ user: created });
      },
      async addCheckin(payload) {
        const user = get().user;
        if (!user) return;

        const checkin: Checkin = { id: uid(), user_id: user.id, ...payload };
        if (db.isReady) {
          await db.supabaseRequest('checkins', { method: 'POST', body: JSON.stringify([checkin]) });
        }

        set((s) => ({ checkins: [...s.checkins.filter((c) => c.data !== payload.data), checkin] }));
      },
      async addMedida(payload) {
        const user = get().user;
        if (!user) return;

        const medida: Medida = { id: uid(), user_id: user.id, ...payload };
        if (db.isReady) {
          await db.supabaseRequest('medidas', { method: 'POST', body: JSON.stringify([medida]) });
        }

        set((s) => ({ medidas: [...s.medidas.filter((m) => m.data !== payload.data), medida] }));
      },
      addWorkout(payload) {
        set((s) => ({ workouts: [{ ...payload, id: uid() }, ...s.workouts] }));
      },
      toggleSetDone(workoutId, setIndex) {
        set((s) => ({
          workouts: s.workouts.map((workout) => {
            if (workout.id !== workoutId) return workout;
            return {
              ...workout,
              sets: workout.sets.map((setItem, index) => (index === setIndex ? { ...setItem, concluida: !setItem.concluida } : setItem))
            };
          })
        }));
      },
      async loadFromSupabase() {
        const user = get().user;
        if (!db.isReady || !user) return;

        const [checkins, medidas] = await Promise.all([
          db.supabaseRequest(`checkins?user_id=eq.${user.id}&select=*&order=data.asc`),
          db.supabaseRequest(`medidas?user_id=eq.${user.id}&select=*&order=data.asc`)
        ]);

        set({
          checkins: (checkins as Checkin[]) ?? [],
          medidas: (medidas as Medida[]) ?? []
        });
      }
    }),
    {
      name: 'gymflow-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        checkins: state.checkins,
        medidas: state.medidas,
        workouts: state.workouts
      })
    }
  )
);
