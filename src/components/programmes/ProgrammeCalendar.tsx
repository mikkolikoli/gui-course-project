"use client"

import { Stack } from "@mui/material"
import WorkoutBox from "./WorkoutBox"

import { ReactElement, ReactNode, useState } from "react"
import { ProgrammeContext } from "./ProgrammeContext"
import { Programme, Workout } from "@/src/firebase/firestore/objects"
import { days } from "@/src/misc/days"


interface ProgrammeCalendarProps {
  programme: Programme
}

export default function ProgrammeCalendar({ programme }: ProgrammeCalendarProps) {

  const [ workouts, setWorkouts ] = useState(programme.workouts)

  return (
    <Stack direction="row">
      {days.map((day, i) => (
        <CalendarDay key={i} day={day} workouts={workouts.filter(workout => workout.days.includes(day))} />
      ))}
    </Stack>
  )
}

interface DayProps {
  day: Day
  workouts: {workout: Workout, days: Day[]}[]
}

function CalendarDay({ day, workouts }: DayProps) {
  return (
    <Stack spacing={2}>
      <h2>{day}</h2>
      {workouts.map((workout, i) => (
        <WorkoutBox key={i} workout={workout.workout} />
      ))}

    </Stack>
  )
}