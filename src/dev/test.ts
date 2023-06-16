export const devExcercises = [
    {
        id: 0,
        name: "Pruut"
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
    name: "Naatuilu",
    sets: devWorkoutSets
}

export function buttonClicked() {
    console.log("Button clicked")
}