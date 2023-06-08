"use client"
import styled from "styled-components"
import { Divider, Stack, Button } from "@mui/material"

interface Props {
  day: string,
  date: Date,
  excercises: {
    id: number,
    name: string
  }[],
  onAddButtonClicked: () => void,
  onNextButtonClicked: () => void
}

export default function Calendar({day, date, excercises, onAddButtonClicked, onNextButtonClicked}: Props) {
  return (
    <Stack
      border={`${1}px solid`}
      borderColor="whitesmoke"
      bgcolor="#3c3c3c"
      color="white"
    >
      <Stack direction="row">
        <h2>{day}</h2>
        <Button onClick={onNextButtonClicked}>{'>'}</Button>
      </Stack>
      <Stack
        component="section"
        spacing={2}
        divider={<Divider />}
        justifyContent="center"
        bgcolor="#b4b4b4"
        color="black"
        padding={1}
      >
        {excercises.map((excercise) => 
          <CalendarComponent key={excercise.id} excercise={excercise.name} />
        )}
        <Button variant="contained" onClick={onAddButtonClicked}>Add excercise</Button>
      </Stack>
    </Stack>
  )
}

function CalendarComponent({excercise}: {excercise: string}) {
  return (
    <Stack direction="row">
      <p>{excercise}</p>
      <Stack>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Stack>
    </Stack>
  )
}