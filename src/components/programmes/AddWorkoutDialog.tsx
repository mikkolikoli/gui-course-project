"use client"

import { Workout, Programme } from "@/src/firebase/firestore/objects";
import { dayList, daysShortList } from "@/src/misc/days";
import { TimeParser } from "@/src/misc/timeparser";
import { Dialog, 
         DialogContent, 
         DialogTitle, 
         FormControl, 
         InputLabel, 
         Select, 
         Typography, 
         MenuItem, 
         SelectChangeEvent, 
         Stack, 
         Grid, 
         FormControlLabel,
         Checkbox, 
         TextField} from "@mui/material";
import { useEffect, useState } from "react";


interface AddWorkoutDialogProps {
  open: boolean,
  handleClose: () => void,
  programmeId: number,
  restDays: Day[]
}
export default function AddWorkoutDialog({ open, handleClose, programmeId, restDays }: AddWorkoutDialogProps) {
  const [ workout, setWorkout ] = useState<Workout>(null as unknown as Workout)
  const [ workouts, setWorkouts ] = useState<Workout[]>([])
  const [ programme, setProgramme ] = useState<Programme>(null as unknown as Programme)
  const [ checked, setChecked ] = useState([false, false, false, false, false, false, false])
  const [ timeInputs, setTimeInputs ] = useState<string[]>([])
  const [ textBoxErrors, setTextBoxErrors ] = useState<boolean[]>([])
  const [ days, setDays ] = useState<Day[]>([])
  const [ times, setTimes ] = useState<WorkoutTime[]>([])

  // load workouts
  // useEffect(() => {}, [])

  const handleWorkoutChange = (e: SelectChangeEvent<number>) => {
    const workout = workouts.find(workout => workout.id === e.target.value)
    if ( workout ) {
      setWorkout(workout)
    }
  }

  const handleCheckboxChange = (i: number) => {
    const newChecked = checked
    newChecked[i] = !newChecked[i]
    setChecked(newChecked)

    updateDays()
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    const newInputs = timeInputs
    newInputs[i] = e.target.value
    setTimeInputs(newInputs)

    const parsedTime = TimeParser.parse(e.target.value)
    if ( !parsedTime ) {
      const newTextBoxErrors = textBoxErrors
      newTextBoxErrors[i] = true
      setTextBoxErrors(newTextBoxErrors)

      return
    }

    const newTextBoxErrors = textBoxErrors
    newTextBoxErrors[i] = false
    setTextBoxErrors(newTextBoxErrors)

    const newTimes = times
    newTimes[i] = { day: days[i], time: parsedTime }
    setTimes(newTimes)
  }

  const updateDays = () => {
    const newDays: Day[] = []
    const newInputs: string[] = []
    const newTimes: WorkoutTime[] = []
    const newTextBoxErrors: boolean[] = []

    checked.forEach((isChecked, i) => {
      if ( isChecked ) {
        newDays.push(days[i])
        newInputs.push("")
        newTimes.push({ day: days[i], time: null as unknown as Time })
        newTextBoxErrors.push(false)
      }
    })
    setDays(newDays)
    setTimeInputs(newInputs)
    setTimes(newTimes)
    setTextBoxErrors(newTextBoxErrors)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new workout</DialogTitle>

      <DialogContent>
        <Stack spacing={3} bgcolor="white">
          <FormControl fullWidth>
            <Typography>Choose a workout to add to this programme</Typography>
            <InputLabel id="workout-select-label">Workout</InputLabel>
          
            <Select
              labelId="workout-select-label"
              id="workout-select"
              label="Workout"
              value={workout.id}
              onChange={handleWorkoutChange}
            >
              {workouts.map((workout, i) => (
                <MenuItem key={i} value={workout.id}>{workout.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Mark for days:</Typography>
            </Grid>
            {daysShortList.map((day, i) => (
              <Grid item xs={2} key={i}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={checked[i]}
                      onChange={() => handleCheckboxChange(i)}
                      disabled={restDays.includes(dayList[daysShortList.indexOf(day)])} />
                  } label={day} />
              </Grid>
            ))}
          </Grid>

          <Stack spacing={2}>
            <Typography>Pick a time for each chosen day:</Typography>
            {days.map((day, i) => (
              <Grid container spacing={2} key={i}>
                <Grid item xs={2}>
                  <Typography>{day}</Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField error={textBoxErrors[i]} value={timeInputs[i]} onChange={(e) => handleTimeChange(e, i)} />
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}