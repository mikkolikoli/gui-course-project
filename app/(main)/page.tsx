"use client"

import Calendar from "@/src/components/calendar"
import NextWorkout from "@/src/components/nextWorkout"
import { Stack, Grid } from "@mui/material"

import { db } from "@/src/firebase/firebaseConfig"
import { collection, doc, getDoc } from "firebase/firestore"

import { AuthContext } from "@/src/authContext"
import { useContext } from "react"

import { User, UserConverter, Programme } from "@/src/firebase/firestore/objects"

// dev stuff
import { workout } from "@/src/dev/test" 

export default async function Home() {

  // user data
  const user = useContext(AuthContext).user

  if ( !user ) {
    return <div>loading...</div>
  }
  const userDataRef = doc(db, "users", user?.uid).withConverter(UserConverter)
  const userData = (await getDoc(userDataRef)).data()

  if ( !userData ) {
    return <div>An error happened loading the user data</div>
  }

  // active programme
  const activeProgramme = userData.programmes && userData.activeProgramme ? 
    userData.programmes.find((programme: Programme) => 
      programme.id === userData.activeProgramme
    ) : 
    null

  // next workout

  const nextWorkout = activeProgramme ? activeProgramme.workouts.find((workout) => {
    const today = new Date()
    const workoutDate = new Date(workout.dates.find((date) => date > today) || workout.dates[0])
    return workoutDate > today
  }) : null

  return (
    <Stack
      component="section" 
      spacing={2}
      direction="row"
      height="80vh"
      mt={4}
    >
      <Calendar programme={activeProgramme} />
      <NextWorkout workout={nextWorkout?.workout} />
    </Stack>
  )
}
