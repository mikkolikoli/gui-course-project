"use client"

import Calendar from "@/src/components/calendar"
import NextWorkout from "@/src/components/nextWorkout"
import { Stack, Grid } from "@mui/material"

// dev stuff
import { devExcercises, buttonClicked } from "@/src/dev/test" 

export default function Home() {
  const day = "Naatuntai"
  const date = new Date()

  return (
    <Stack
      component="section" 
      spacing={2}
      direction="row"
      height="80vh"
      mt={4}
    >
      <Calendar />
      <NextWorkout />
    </Stack>
  )
}
