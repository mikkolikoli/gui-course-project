import { useContext, useState, ChangeEvent } from "react";
import { DurationContext } from "./newWorkoutForm";
import { Duration } from "../../firebase/firestore/duration";

import { Stack, Typography, TextField } from "@mui/material";

export default function DurationForm() {
  const { duration, setDuration } = useContext(DurationContext);

  const [hours, setHours] = useState(duration.hours);
  const [minutes, setMinutes] = useState(duration.minutes);

  const onHoursChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setHours(e.target.value);
    setDuration(new Duration(+e.target.value, minutes));
  };

  const onMinutesChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMinutes(e.target.value);
    setDuration(new Duration(hours, +e.target.value));
  };

  return (
    <Stack direction="row">
      <Typography>Duration</Typography>

      <TextField
        type="number"
        label="Hours"
        value={hours}
        onChange={onHoursChange}
      />
      <Typography>:</Typography>
      <TextField
        type="number"
        label="Minutes"
        value={minutes}
        onChange={onMinutesChange}
      />
    </Stack>
  );
}
