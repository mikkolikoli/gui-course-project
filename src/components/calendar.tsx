"use client"
import styled from "styled-components"
import { Divider, Stack, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { devExcercises } from "../dev/test"
import { useState } from "react"

export default function Calendar() {
  const placeholder = {
    day: "Naatuntai",
    excercises: devExcercises,
    onNextButtonClicked: () => {},
    onPreviousButtonClicked: () => {},
    onAddButtonClicked: () => {}
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const currentDay = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
  const [ selectedDay, setSelectedDay ] = useState(currentDay)

  const onDayChange = (event: SelectChangeEvent) => {
    setSelectedDay(event.target.value as string)
  }

  return (
    <Stack
      border={`${1}px solid`}
      borderColor="whitesmoke"
      bgcolor="#b4b4b4"
      color="black"
      width="25vw"
    >
      <Stack direction="row"
        bgcolor="#3c3c3c"
        color="white"
      >
        <Button onClick={placeholder.onPreviousButtonClicked}>{'<'}</Button>

        <FormControl fullWidth>
          <Select
            value={selectedDay}
            label="selectedDay"
            onChange={onDayChange}
          >
            {days.map((day) =>
              <MenuItem key={day} value={day}>{day}</MenuItem>
            )}
          </Select>
        </FormControl>

        <Button onClick={placeholder.onNextButtonClicked}>{'>'}</Button>
      </Stack>
      <Stack
        component="section"
        spacing={2}
        divider={<Divider />}
        justifyContent="center"
        
        padding={1}
      >
        {placeholder.excercises.map((excercise) => 
          <CalendarComponent key={excercise.id} excercise={excercise.name} />
        )}
        <Button variant="contained" onClick={placeholder.onAddButtonClicked}>Add excercise</Button>
      </Stack>
    </Stack>
  )
}

function CalendarComponent({excercise}: {excercise: string}) {
  return (
    <Stack 
      direction="row"
      justifyContent="space-between"
    >
      <p>{excercise}</p>
      <Stack>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Stack>
    </Stack>
  )
}