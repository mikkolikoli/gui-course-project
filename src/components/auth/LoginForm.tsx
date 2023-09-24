import { useState, FormEvent } from "react";

import { Stack, TextField, Button } from "@mui/material";
import signIn from "../../firebase/auth/signin";

interface Props {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorColor, setErrorColor] = useState(false);
  const [errorText, setErrorText] = useState("");

  const setError = (value: boolean) => {
    if (!value) {
      setErrorText("");
      setErrorColor(false);
      return;
    } else {
      setErrorText("Incorrect email or password");
      setErrorColor(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { result, error } = await signIn(email, password);
    if (error) {
      setError(true);
    } else {
      setError(false);
      onSuccess();
    }
  };

  return (
    <Stack
      component="form"
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      onSubmit={handleSubmit}
    >
      <TextField
        error={errorColor}
        type="email"
        label="E-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        helperText={errorText}
      />
      <TextField
        error={errorColor}
        type="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        helperText={errorText}
      />

      <Button variant="contained" type="submit">
        Login
      </Button>
    </Stack>
  );
}
