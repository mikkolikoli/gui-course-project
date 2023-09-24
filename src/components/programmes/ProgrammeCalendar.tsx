"use client";

import {
  Button,
  Divider,
  Stack,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import WorkoutBox from "./WorkoutBox";

import { ReactElement, ReactNode, createContext, useState } from "react";
import { ProgrammeContext } from "./ProgrammeContext";
import { Programme, Workout } from "@/src/firebase/firestore/objects";
import { dayList } from "@/src/misc/days";
import AddWorkoutDialog from "./AddWorkoutDialog";

interface ProgrammeCalendarProps {
  programme: Programme;
}

export default function ProgrammeCalendar({
  programme,
}: ProgrammeCalendarProps) {
  const [workouts, setWorkouts] = useState(programme.workouts);

  return (
    <Stack direction="row" bgcolor="gray" spacing={2} divider={<Divider />}>
      {dayList.map((day, i) => (
        <CalendarDay key={i} day={day} />
      ))}
    </Stack>
  );
}

interface DayProps {
  day: Day;
  workouts?: { workout: Workout; times: WorkoutTime[] }[];
}

function CalendarDay({ day, workouts }: DayProps) {
  const [restDay, setRestDay] = useState(false);

  return (
    <Stack spacing={2} height={400}>
      <Stack
        spacing={2}
        bgcolor="darkgray"
        height="80%"
        width={130}
        padding={2}
        alignItems="center"
      >
        <h2>{day}</h2>
        {/* 
        {workouts.map((workout, i) => (
          <WorkoutBox key={i} workout={workout.workout} />
        ))}
        */}
      </Stack>
      <FormControlLabel
        control={
          <Checkbox checked={restDay} onChange={(e) => setRestDay(!restDay)} />
        }
        label="Rest day"
      />
    </Stack>
  );
}
