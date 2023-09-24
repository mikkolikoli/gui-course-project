"use client";

import { useState, createContext, useContext } from "react";
import { AuthContext } from "@/src/authContext";
import {
  Stack,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

import DurationForm from "./DurationForm";

import { db } from "../../firebase/firebaseConfig";

import { ExcerciseSet, Excercise } from "../../firebase/firestore/objects";
import { Duration } from "../../firebase/firestore/duration";
import NewSet from "./newSet";

type WorkoutType = "strength" | "cardio";

export const DurationContext = createContext(null as any);
export const SetsContext = createContext(null as any);

export default function NewWorkoutForm() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  // TODO: make the user's active program the default
  const [program, setProgram] = useState("");
  const [sets, setSets] = useState<ExcerciseSet[]>();
  const [type, setType] = useState<WorkoutType>("strength");

  const [duration, setDuration] = useState<Duration>(new Duration(0, 0, 0));

  const saveWorkout = async () => {};

  return (
    <Stack bgcolor="gray" spacing={2} justifyContent="flex-start" p={3}>
      <Stack direction="row" spacing={2} justifyContent="flex-start">
        <Typography>Name:</Typography>
        <TextField
          required
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Stack>

      <DurationContext.Provider value={{ duration, setDuration }}>
        <DurationForm />
      </DurationContext.Provider>

      <Typography>Program:</Typography>
      <Select value={program} onChange={(e) => setProgram(e.target.value)}>
        <MenuItem></MenuItem>
      </Select>

      <Stack direction="row" spacing={2}>
        <Typography>Type:</Typography>

        <Select
          value={type}
          onChange={(e) => setType(e.target.value as WorkoutType)}
        >
          <MenuItem value="strength">Strength</MenuItem>
          <MenuItem value="cardio">Cardio</MenuItem>
        </Select>
      </Stack>

      <Divider />

      <SetsContext.Provider value={{ sets, setSets }}>
        <NewSet type={type} />
      </SetsContext.Provider>
    </Stack>
  );
}
