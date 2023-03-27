export interface Exercise {
    [key: string]: string | string[] | undefined | '' | 'kg' | 'lb',
    name: string,
    img: string,
    muscles?: string[],
    sets?: string,
    reps?: string,
    weight?: string,
    unit?: "" | "kg" | "lb",
    rest?: string
}

export interface WholeExercise {
    created_at: string,
    id: number,
    exercise: Exercise
}

export interface ExerciseResponse {
    count: null,
    data: WholeExercise[] | null,
    error: SupabaseError | null,
    status: number,
    statusText: string
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

export interface WorkoutResponse {
    count: null,
    data: WholeWorkout[] | null,
    error: SupabaseError | null,
    status: number,
    statusText: string
}

interface SupabaseError {
    code: string
    details: null
    hint: null
    message: string
}

export interface Route {
    path: { name: string },
    content: string,
    protected?: boolean,
    callback?: Callback
}

export interface Callback {
    (): void
}

export interface UserResponse {
    data: {
        user: {
            app_metadata: object,
            aud: string,
            confirmed_at: string,
            created_at: string,
            email: string,
            email_confirmed_at: string,
            id: string,
            identities: object[],
            last_sign_in_at: string,
            phone: string,
            role: string,
            updated_at: string,
            user_metadata: {}
        }
    },
    error: null
}