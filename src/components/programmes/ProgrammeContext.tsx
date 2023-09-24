import { createContext } from 'react'
import { Workout } from '@/src/firebase/firestore/objects'

export const ProgrammeContext = createContext<[{workout: Workout; days: Day[];}]>(
  null as unknown as [{
  workout: Workout;
  days: Day[];
}])