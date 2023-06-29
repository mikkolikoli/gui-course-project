"use client"

import Calendar from "@/src/components/calendar"
import NextWorkout from "@/src/components/nextWorkout"
import { Stack, Grid } from "@mui/material"

import { db } from "@/src/firebase/firebaseConfig"
import { doc } from "firebase/firestore"

// dev stuff
import { devWorkout, buttonClicked } from "@/src/dev/test" 

export default function Home() {

  return (
    <Stack
      component="section" 
      spacing={2}
      direction="row"
      height="80vh"
      mt={4}
    >
      <Calendar />
      <NextWorkout workout={devWorkout} />
    </Stack>
  )
}
