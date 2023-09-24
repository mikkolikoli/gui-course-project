"use client";
import { Box } from "@mui/material";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box bgcolor="lightgray" color="black">
        <Box mx={8} my={4}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
