"use client";
import { useState } from "react";

import Link from "next/link";
import { Stack } from "@mui/material";
import SuccessSnackBar from "@/src/components/successSnackBar";
import { useRouter } from "next/navigation";
import SignUpForm from "@/src/components/auth/SignUpForm";

export default function Page() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSuccess = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
      router.push("/login"); // redirect to "/login" after showing the snackbar
    }, 1000);
  };

  return (
    <Stack
      component="section"
      alignItems="center"
      justifyContent="center"
      direction="column"
      spacing={2}
    >
      <h1>Sign up</h1>

      <SignUpForm onSuccess={handleSuccess} />

      {snackbarOpen ? (
        <SuccessSnackBar isOpen={true} text="Successfully signed up" />
      ) : null}
      <p>
        Already have an account? <Link href="/login">Login instead</Link>
      </p>
    </Stack>
  );
}
