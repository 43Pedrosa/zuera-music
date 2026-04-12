export type User = {
  id: string;
  nome: string;
  telefone: string;
};

export type Checkin = {
  id: string;
  user_id: string;
  data: string;
  peso: number;
  gordura: number;
  energia: number;
  sono: number;
  treinou: boolean;
  alimentacao_ok: boolean;
  calorias?: number;
  proteina?: number;
};

export type Medida = {
  id: string;
  user_id: string;
  data: string;
  braco: number;
  peito: number;
  cintura: number;
  perna: number;
};

export type ExerciseSet = {
  series: number;
  reps: number;
  carga: number;
  concluida: boolean;
};

export type Workout = {
  id: string;
  nome: string;
  exercicio: string;
  data: string;
  descansoSeg: number;
  sets: ExerciseSet[];
};
