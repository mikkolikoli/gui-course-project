import { Stack, TextField, Button } from "@mui/material"
import { useState, FormEvent } from "react"
import signUp from "../firebase/auth/signup"

interface Props {
  onSuccess: () => void
}

export default function SignUpForm({ onSuccess }: Props) {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ repeatPassword, setRepeatPassword ] = useState("")
  const [ uiError, setUiError ] = useState(false)
  const [ errortext, setErrortext] = useState("")

  const signUpFormSubmitted = async (e: FormEvent) => {
    e.preventDefault()

    if (password !== repeatPassword) {
      setUiError(true)
      setErrortext("Passwords don't match")
    }
    else {
      setUiError(false)
      setErrortext("")
    }

    if (!uiError) {
      const { result, error } = await signUp(email, password)

      if (error) {
        setUiError(true)
        setErrortext("Email already in use")
      }
      else {
        setUiError(false)
        onSuccess()
      }
    }
  }

  return (
    <Stack 
      component="form" 
      direction="column" 
      alignItems="center"
      justifyContent="center"
      spacing={2} 
      onSubmit={signUpFormSubmitted}
    >
      <TextField
        required
        type="email"
        label="E-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="username" />
      <TextField
        required
        error={uiError}
        helperText={errortext}
        type="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)} 
        autoComplete="new-password" />
      <TextField
        required
        error={uiError}
        helperText={errortext}
        type="password"
        label="Repeat password"
        value={repeatPassword}
        onChange={(event) => setRepeatPassword(event.target.value)}
        autoComplete="new-password" />

      <Button
        variant="contained"
        type="submit"
      >
        Sign up
      </Button>
    </Stack>
  )
}