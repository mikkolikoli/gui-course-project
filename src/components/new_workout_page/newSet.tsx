"use client"

import { Excercise, ExcerciseSet } from "../../firebase/firestore/objects"

import { Stack, TextField, Button, Typography, Grid } from "@mui/material"

import { FormEvent, useState, useContext } from "react"
import { SetsContext } from "./newWorkoutForm"

import { toast } from "react-hot-toast"

type TimeFormat = "seconds" | "minutes"

interface ExcerciseDisplayProps {
  excercise: Excercise,
  sets?: number
}

function ExcerciseDisplay({ excercise, sets }: ExcerciseDisplayProps) {
  return (
    <Grid container>
      { sets && 
        <Grid item xs={4}>
          <Typography>{sets}</Typography>
        </Grid>
      }

      <Grid item xs={4}>
        <Typography>{excercise.name}</Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography>{excercise.reps ? excercise.reps: excercise.length?.toString()}</Typography>
      </Grid>
    </Grid>
  )
}


interface Props {
  type: "strength" | "cardio",
  number?: number
}

export default function NewSet({ type, number }: Props) {
  const { sets, setSets } = useContext(SetsContext)
  const [ excercises, setExcercises ] = useState<{excercise: Excercise, sets?: number}[]>([])

  const addExcercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    formData.forEach((value, key) => {
      console.log(key, value)
    })
  }

  return (
    <Stack
      bgcolor="gray"
    >
      { number && <Typography>Set {number}</Typography> }

      <Grid container>
        {type === "strength" && 
          <Grid item xs={4}>
            <Typography>Sets</Typography>
          </Grid>
        }

        <Grid item xs={4}>
          <Typography>Reps</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography>Excercise</Typography>
        </Grid>
      </Grid>

      { excercises.map((excercise, i) => (
        <ExcerciseDisplay key={i} excercise={excercise.excercise} sets={excercise.sets} />
      ))}
    </Stack>
  )
}