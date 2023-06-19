import { Duration } from "./duration";

export type Excercise = {
    id: number,
    name: string,
    reps?: number,
    intensity?: number,
    weight?: number,
    length?: Duration
}

export type ExcerciseSet = {
    id: number,
    excercises: Excercise[],
    repetitions: number,
    rest?: number
}

export type Workout = {
    id: number,
    name: string,
    time?: Date
    sets: ExcerciseSet[],
}

export type Programme = {
    id: number,
    name: string,
    workouts: [
        {
            workout: Workout,
            dates: Date[]
        }
    ]
}