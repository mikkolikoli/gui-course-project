export const devExcercises = [
    {
        id: 0,
        name: "Placeholder-excercise 1"
    },
    {
        id: 1,
        name: "Placeholder-excercise 1",
        reps: 4
    }
]

export const devWorkoutSets = [
    {
        id: 0,
        excercises: devExcercises,
        repetitions: 1,
        rest: 180
    }
]

export const devWorkout = {
    id: 0,
    name: "Placeholder Workout",
    sets: devWorkoutSets
}

export function buttonClicked() {
    console.log("Button clicked")
}