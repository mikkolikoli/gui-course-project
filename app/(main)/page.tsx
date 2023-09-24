"use client";

import Calendar from "@/src/components/calendar";
import NextWorkout from "@/src/components/nextWorkout";
import { Stack, Grid } from "@mui/material";

import { db } from "@/src/firebase/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

import { AuthContext } from "@/src/authContext";
import { useContext } from "react";

import {
  User,
  UserConverter,
  Programme,
} from "@/src/firebase/firestore/objects";
import { dayList } from "@/src/misc/days";

import { redirect } from "next/navigation";

export default async function Home() {
  // user data
  const user = useContext(AuthContext).user;

  if (!user) {
    redirect("/login");
  }
  const userDataRef = doc(db, "users", user?.uid).withConverter(UserConverter);
  const userData = (await getDoc(userDataRef)).data();

  if (!userData) {
    return <div>An error happened loading the user data</div>;
  }

  // active programme
  const activeProgramme =
    userData.programmes && userData.activeProgramme
      ? userData.programmes.find(
          (programme: Programme) => programme.id === userData.activeProgramme,
        )
      : null;

  // workouts of the day
  const today = dayList[new Date().getDay()];
  const workouts = activeProgramme
    ? activeProgramme.workouts.filter(
        (workout) =>
          workout.times.filter((time) => time.day === today).length > 0,
      )
    : [];

  return (
    <Stack component="section" spacing={2} direction="row" height="80vh" mt={4}>
      <Calendar programme={activeProgramme} />
      <NextWorkout workouts={workouts} />
    </Stack>
  );
}
