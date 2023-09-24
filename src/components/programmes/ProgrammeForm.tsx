"use client"
import { Select, Stack, Typography, InputLabel, MenuItem, TextField, Button, SelectChangeEvent } from "@mui/material";
import ProgrammeCalendar from "./ProgrammeCalendar";

import { useState, useContext, useEffect, createContext } from "react"
import { AuthContext } from "@/src/authContext";

import { Programme, ProgrammeConverter, User, UserConverter, Workout } from "@/src/firebase/firestore/objects";
import { db } from "@/src/firebase/firebaseConfig"
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import AddWorkoutDialog from "./AddWorkoutDialog";


export const AddWorkoutContext = createContext({} as {
  workout: Workout,
  times: WorkoutTime[]
})

export default function ProgrammeForm() {
  const [programme, setProgramme] = useState<Programme>(null as unknown as Programme)
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [programmeId, setProgrammeId] = useState(0)
  const [newProgrammeName, setNewProgrammeName] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [error, setError] = useState(false)
  const [popupShown, setPopupShown] = useState(false)
  const [restDays, setRestDays] = useState<Day[]>([])

  const user = useContext(AuthContext).user

  // load user data on first render or if user changes
  useEffect(() => {
    if ( !user ) {
      setError(true)
      return
    }
    const userDataRef = doc(db, "users", user.uid).withConverter(UserConverter)
    const userData = getDoc(userDataRef).then((doc) => {
      const data = doc.data()
      if ( data ) {
        setProgrammes(data.programmes ? data.programmes : [])
        return data
      }
      setError(true)
      return null
    }
    )
  }, [user])

  const setNewActiveProgramme = ( programme: Programme ) => {
    if ( !user ) {
      setError(true)
      return
    }

    const userDataRef = doc(db, "users", user.uid).withConverter(UserConverter)
    const userData = getDoc(userDataRef).then((doc) => {
      const data = doc.data()
      if ( data ) {
        data.activeProgramme = programme.id
        setDoc(userDataRef, data)
        return data
      }
      setError(true)
      return null
    })
  }

  const handleProgramChange = (e: SelectChangeEvent<Number>) => {
    setProgrammeId(e.target.value as number)
    const programme = programmes.find((programme) => programme.id === e.target.value)
    if ( programme ) {
      setProgramme(programme)
      setProgrammeId(programme.id)
      setNewActiveProgramme(programme)
      setShowCalendar(true)
    }
  }

  const createNewProgram = () => {
    const newProgramme = new Programme(Date.now(), newProgrammeName, [] as unknown as [{workout: Workout, times: WorkoutTime[]}])
    // add new programme to users programmes
    if ( !user ) {
      setError(true)
      return
    }

    const userDataRef = doc(db, "users", user.uid).withConverter(UserConverter)
    const userData = getDoc(userDataRef).then((doc) => {
      const data = doc.data()
      if ( data ) {
        const newProgrammeData = {id: newProgramme.id, name: newProgramme.name, workouts: newProgramme.workouts}
        data.programmes ? data.programmes.push(newProgrammeData): data.programmes = [newProgrammeData]
        setDoc(userDataRef, data)

        setProgramme(newProgramme)
        setProgrammeId(newProgramme.id)
        setProgrammes([...programmes, newProgramme])
        setNewActiveProgramme(newProgramme)
        setNewProgrammeName('')
        setShowCalendar(true)
        return data
      }
      setError(true)
      return null
    })
  }

  const showPopup = () => {
    setPopupShown(true)
  }

  const addWorkout = () => {}

  if ( error ) {
    return (
      <div>An error has happened</div>
    )
  }

  return (
    <Stack spacing={2} bgcolor={"gray"} mt={3}>
      <Stack direction="row" spacing={5}>
        <Stack>
          <InputLabel id="programme-select-label">Choose programme:</InputLabel>
          <Select
            labelId="programme-select-label"
            id="programme-select"
            value={programmeId}
            label="Choose a program"
            onChange={handleProgramChange}
          >
            {programmes.map((programme, i) => (
              <MenuItem key={i} value={programme.id}>{programme.name}</MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack>
          <InputLabel id="new-programme-label">Create new programme:</InputLabel>
          <TextField
            id="new-programme"
            value={newProgrammeName} 
            onChange={(e) => setNewProgrammeName(e.target.value)} 
          />
        </Stack>
        <Button onClick={createNewProgram}>Create</Button>
      </Stack>
      {showCalendar && <ProgrammeCalendar programme={programme} />}
      {showCalendar && <Button onClick={showPopup}>Add a workout to this programme</Button>}
      {showCalendar && 
      <AddWorkoutContext.Provider value = {null as unknown as {workout: Workout, times: WorkoutTime[]}}>
        <AddWorkoutDialog open={popupShown} handleClose={() => setPopupShown(false)} restDays={restDays} />
      </AddWorkoutContext.Provider>}
    </Stack>
  )
}