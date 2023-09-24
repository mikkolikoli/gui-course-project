import { Duration } from "./duration";

export class Programme {
  id: number;
  name: string;
  workouts: [{ workout: Workout; times: WorkoutTime[] }]; // times: [{ day: Day, time: Time }]

  constructor(
    id: number,
    name: string,
    workouts: [{ workout: Workout; times: WorkoutTime[] }],
  ) {
    this.id = id;
    this.name = name;
    this.workouts = workouts;
  }
}

export const ProgrammeConverter = {
  toFirestore: function (programme: Programme) {
    return {
      id: programme.id,
      name: programme.name,
      workouts: programme.workouts,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new Programme(data.id, data.name, data.workouts);
  },
};

// ----------------------------------------------------------------------------------------------

export class Workout {
  id: number;
  name: string;
  time?: Duration;
  sets: ExcerciseSet[];

  constructor(id: number, name: string, sets: ExcerciseSet[], time?: Duration) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.sets = sets;
  }
}

export const WorkoutConverter = {
  toFirestore: function (workout: Workout) {
    return {
      id: workout.id,
      name: workout.name,
      time: workout.time,
      sets: workout.sets,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new Workout(data.id, data.name, data.sets, data.time);
  },
};

// ----------------------------------------------------------------------------------------------

export class ExcerciseSet {
  id: number;
  excercises: Excercise[];
  repetitions: number;
  rest?: Duration;

  constructor(
    id: number,
    excercises: Excercise[],
    repetitions: number,
    rest?: Duration,
  ) {
    this.id = id;
    this.excercises = excercises;
    this.repetitions = repetitions;
    this.rest = rest;
  }
}

export const ExcerciseSetConverter = {
  toFirestore: function (excerciseSet: ExcerciseSet) {
    return {
      id: excerciseSet.id,
      excercises: excerciseSet.excercises,
      repetitions: excerciseSet.repetitions,
      rest: excerciseSet.rest,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new ExcerciseSet(
      data.id,
      data.excercises,
      data.repetitions,
      data.rest,
    );
  },
};

// ----------------------------------------------------------------------------------------------

export class Excercise {
  id: number;
  name: string;
  reps?: number;
  intensity?: string;
  weight?: number;
  length?: Duration;

  constructor(
    id: number,
    name: string,
    reps?: number,
    intensity?: string,
    weight?: number,
    length?: Duration,
  ) {
    this.id = id;
    this.name = name;
    this.reps = reps;
    this.intensity = intensity;
    this.weight = weight;
    this.length = length;
  }
}

export const ExcerciseConverter = {
  toFirestore: function (excercise: Excercise) {
    return {
      id: excercise.id,
      name: excercise.name,
      reps: excercise.reps,
      intensity: excercise.intensity,
      weight: excercise.weight,
      length: excercise.length,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new Excercise(
      data.id,
      data.name,
      data.reps,
      data.intensity,
      data.weight,
      data.length,
    );
  },
};

// ----------------------------------------------------------------------------------------------

export class User {
  email: string;
  programmes?: Programme[];
  activeProgramme?: number;

  constructor(
    email: string,
    programmes?: Programme[],
    activeProgramme?: number,
  ) {
    this.email = email;
    this.programmes = programmes;
    this.activeProgramme = activeProgramme;
  }
}

export const UserConverter = {
  toFirestore: function (user: User) {
    if (user.programmes && user.activeProgramme) {
      return {
        email: user.email,
        programmes: user.programmes,
        activeProgramme: user.activeProgramme,
      };
    } else if (user.programmes) {
      return {
        email: user.email,
        programmes: user.programmes,
      };
    } else {
      return {
        email: user.email,
      };
    }
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new User(data.email, data.programmes, data.activeProgramme);
  },
};
