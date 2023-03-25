export interface Exercise {
    name: string,
    img: string,
    muscles: string[],
    sets: string,
    reps: string,
    weight: string,
    unit: "kg" | "lb",
    rest: string
}

export interface Workout {
    name: string,
    exercises: Exercise[]
}

export interface WorkoutResponse {
    created_at: string,
    id: number,
    user_id: string,
    workout: Workout
}

export interface Route {
    path: { name: string },
    content: string,
    protected?: boolean,
    callback?: undefined
}

export interface Callback {
    (): void
}