export interface Exercise {
    name: string,
    img: string,
    muscles?: string[],
    sets: string,
    reps: string,
    weight: string,
    unit: "kg" | "lb",
    rest: string
}

export interface Workout {
    name: string,
    exercises: Exercise[],
    id?: number
}

export interface WholeWorkout {
    created_at: string,
    id: number,
    user_id: string,
    workout: Workout
}

interface WorkoutError {
    code: string
    details: null
    hint: null
    message: string
}

export interface WorkoutsResponse {
    count: null,
    data: WholeWorkout[] | null,
    error: WorkoutError | null,
    status: number,
    statusText: ''
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