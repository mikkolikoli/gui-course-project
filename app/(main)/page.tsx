"use client"

import Calendar from "@/src/components/calendar"
import NextWorkout from "@/src/components/nextWorkout"
import { Stack } from "@mui/material"

// dev stuff
import { devExcercises, buttonClicked } from "@/src/dev/test" 

export default function Home() {
  const day = "Naatuntai"
  const date = new Date()

  return (
    <Stack direction="row">
      <Calendar 
        day={day} 
        date={date} 
        excercises={devExcercises} 
        onAddButtonClicked={buttonClicked} 
        onNextButtonClicked={buttonClicked} />
    </Stack>
  )
}
