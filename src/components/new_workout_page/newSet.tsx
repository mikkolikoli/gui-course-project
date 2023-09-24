"use client"

import { Excercise, ExcerciseSet } from "../../firebase/firestore/objects"

import { Stack, TextField, Button, Typography, Grid, Divider, FilledInput, InputLabel, FormControl, Select, MenuItem } from "@mui/material"

import { FormEvent, useState, useContext, ChangeEvent } from "react"
import { SetsContext } from "./newWorkoutForm"

import { toast } from "react-hot-toast"
import { Duration } from "@/src/firebase/firestore/duration"

type TimeFormat = "seconds" | "minutes"

interface ExcerciseDisplayProps {
  excercise: Excercise,
  sets?: number
}

function ExcerciseDisplay({ excercise, sets }: ExcerciseDisplayProps) {
  return (
    <Grid container>
      { sets && 
        <Grid item xs={2}>
          <Typography>{sets}</Typography>
        </Grid>
      }

      <Grid item xs={2}>
        <Typography>{excercise.name}</Typography>
      </Grid>

      <Grid item xs={2}>
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

  const [ setAmount, setSetAmount ] = useState(0)
  const [ reps, setReps ] = useState(0)
  const [ duration, setDuration ] = useState<Duration>(new Duration(0, 0, 0))
  const [ excerciseName, setExcerciseName ] = useState("")
  const [ id, setId ] = useState(0)
  
  type RepType = "reps" | "min" | "sec"
  const [ repType, setRepType ] = useState<RepType>("reps")

  const handleRepChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    if (repType === "reps") {
      setReps(parseInt(e.target.value))
    } else if (repType === "min") {
      setDuration(new Duration(0, parseInt(e.target.value), 0))
    } else if (repType === "sec") {
      setDuration(new Duration(0, 0, parseInt(e.target.value)))
    }
  }

  const addExcercise = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (setAmount === 0) {
      toast.error("Please enter a valid set amount")
      return
    }
    
    if (reps === 0 && duration.getTotalSeconds() === 0) {
      toast.error("Please enter a valid rep amount or duration")
      return
    }

    if (excerciseName === "") {
      toast.error("Please enter a valid excercise name")
      return
    }

    const newExcercise = {
      excercise: new Excercise(id, excerciseName, reps),
      sets: type === "strength" ? setAmount: undefined
    }

    setExcercises([...excercises, newExcercise])
  }

  return (
    <Stack
      bgcolor="gray"
    >
      { number && <Typography>Set {number}</Typography> }

      <Grid container>
        {type === "strength" &&
          <Grid item xs={2}>
            <Typography>Sets</Typography>
          </Grid>
        }
        <Grid item xs={2}>
          <Typography>Reps/Duration</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Excercise</Typography>
        </Grid>
      </Grid>

      {excercises.map((excercise, i) => (
        <ExcerciseDisplay key={i} excercise={excercise.excercise} sets={excercise.sets} />
      ))}

      <Stack
        component="form"
        onSubmit={addExcercise}
        direction="row"
        spacing={2}
        mt={2}
        mb={2}
      >
        {type === "strength" &&
          <TextField
            label="Sets"
            type="number"
            onChange={(e) => setSetAmount(parseInt(e.target.value))}
          />
        }
        <FormControl variant="filled">
          <InputLabel
            htmlFor="reps"
          >
            {repType === "reps"? "Reps": "Duration"}
          </InputLabel>
          <FilledInput
            id="reps"
            type="number"
            onChange={handleRepChange}
            endAdornment={
              <Select
                value={repType}
                onChange={(e) => setRepType(e.target.value as RepType)}
              >
                <MenuItem value="reps">Reps</MenuItem>
                <MenuItem value="min">min</MenuItem>
                <MenuItem value="sec">s</MenuItem>
              </Select>
            }
          />
        </FormControl>

        <TextField
          label="Excercise"
          onChange={(e) => setExcerciseName(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
        >Submit</Button>
      </Stack>

      <Divider />

      <Button 
        variant="contained"
        fullWidth={false}
        onClick={() => setSets([...sets, excercises])}
      >
        Save
      </Button>
    </Stack>
  )
}