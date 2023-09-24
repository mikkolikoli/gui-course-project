"use client";
import styled from "styled-components";
import {
  Divider,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { devExcercises, devWorkout } from "../dev/test";
import { useState, useContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../authContext";
import { db } from "../firebase/firebaseConfig";
import { Programme } from "../firebase/firestore/objects";

interface Props {
  programme: Programme | null | undefined;
}

export default function Calendar({ programme }: Props) {
  const placeholder = {
    workouts: [devWorkout],
    onAddButtonClicked: () => {},
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const currentDay =
    days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const onDayChange = (event: SelectChangeEvent) => {
    setSelectedDay(event.target.value as string);
  };

  const onPreviousButtonClicked = (event: any) => {
    const currentIndex = days.findIndex((day: string) => day === selectedDay);
    setSelectedDay(currentIndex > 0 ? days[currentIndex - 1] : days[6]);
  };

  const onNextButtonClicked = (event: any) => {
    const currentIndex = days.findIndex((day: string) => day === selectedDay);
    setSelectedDay(currentIndex < 6 ? days[currentIndex + 1] : days[0]);
  };

  return (
    <Stack
      border={`${1}px solid`}
      borderColor="whitesmoke"
      bgcolor="#b4b4b4"
      color="black"
      width="25vw"
    >
      <Stack direction="row" bgcolor="#3c3c3c" color="white">
        <Button onClick={onPreviousButtonClicked}>{"<"}</Button>

        <FormControl fullWidth>
          <Select
            value={selectedDay}
            label="selectedDay"
            onChange={onDayChange}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={onNextButtonClicked}>{">"}</Button>
      </Stack>
      <Stack
        component="section"
        spacing={2}
        divider={<Divider />}
        justifyContent="center"
        padding={1}
      >
        {placeholder.workouts.map((workout) => (
          <CalendarComponent key={workout.id} excercise={workout.name} />
        ))}
        <Button variant="contained" onClick={placeholder.onAddButtonClicked}>
          Add excercise
        </Button>
      </Stack>
    </Stack>
  );
}

function CalendarComponent({ excercise }: { excercise: string }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <p>{excercise}</p>
      <Stack>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Stack>
    </Stack>
  );
}
