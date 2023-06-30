import { Stack, List, Tooltip } from "@mui/material"
import { Workout } from "../firebase/firestore/objects"
import Set from "./set"

interface NextWorkoutProps {
    workout: Workout
}

export default function NextWorkout({ workout }: NextWorkoutProps) {
    return (
        <Stack
            border={`${1}px solid`}
            borderColor="whitesmoke"
            bgcolor="#b4b4b4"
            color="black"
            width="25vw"
            m={2}
            ml={2}
            p={2}
        >
            <h2>Next workout</h2>

            <h3>{workout.name}</h3>

            <List>
                { workout.sets.map((set) => 
                    <Set key={set.id} excerciseSet={set} />
                )}
            </List>
        </Stack>
    )
}