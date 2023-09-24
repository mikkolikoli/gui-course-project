import { Duration } from "../firebase/firestore/duration";
import {
  Excercise,
  ExcerciseSet,
  Workout,
} from "../firebase/firestore/objects";

export const devExcercises = [
  {
    id: 0,
    name: "Placeholder-excercise 1",
  },
  {
    id: 1,
    name: "Placeholder-excercise 1",
    reps: 4,
  },
];

const excercises = [
  new Excercise(0, "Placeholder-excercise 1", 4),
  new Excercise(1, "Placeholder-excercise 2"),
];

export const devWorkoutSets = [
  {
    id: 0,
    excercises: devExcercises,
    repetitions: 1,
    rest: 180,
  },
];

export const workoutSets = [
  new ExcerciseSet(0, excercises, 3, new Duration(0, 1, 30)),
];

export const devWorkout = {
  id: 0,
  name: "Placeholder Workout",
  sets: devWorkoutSets,
};

export const workout = new Workout(1, "Placeholder Workout", workoutSets);

export function buttonClicked() {
  console.log("Button clicked");
}
