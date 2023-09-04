"use client"
import { Select, Stack, Typography, InputLabel, MenuItem, TextField, Button, SelectChangeEvent } from "@mui/material";
import ProgrammeCalendar from "./ProgrammeCalendar";

import { useState, useContext, useEffect } from "react"
import { AuthContext } from "@/src/authContext";

import { Programme, ProgrammeConverter, User, UserConverter, Workout } from "@/src/firebase/firestore/objects";
import { db } from "@/src/firebase/firebaseConfig"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"

export default function ProgrammeForm() {
  const [programme, setProgramme] = useState(null as unknown as Programme)
  const [programmes, setProgrammes] = useState([] as unknown as Programme[])
  const [newProgrammeName, setNewProgrammeName] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [error, setError] = useState(false)

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

  const handleProgramChange = (e: SelectChangeEvent<Number>) => {
    const programme = programmes.find((programme) => programme.id === e.target.value)
    if ( programme ) {
      setProgramme(programme)
      setShowCalendar(true)
    }
  }

  const createNewProgram = () => {
    const newProgramme = new Programme(Date.now(), newProgrammeName, [] as unknown as [{workout: Workout, days: Day[]}])
    // add new programme to users programmes
    if ( !user ) {
      setError(true)
      return
    }

    const userDataRef = doc(db, "users", user.uid).withConverter(UserConverter)
    const userData = getDoc(userDataRef).then((doc) => {
      const data = doc.data()
      if ( data ) {
        data.programmes ? data.programmes.push(newProgramme): data.programmes = [newProgramme]
        setDoc(userDataRef, data)

        setProgramme(newProgramme)
        setProgrammes([...programmes, newProgramme])
        setShowCalendar(true)
        return data
      }
      setError(true)
      return null
    })
  }

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
            value={programme.id}
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
    </Stack>
  )
}