



// Интерфейс для User при запросе авторизации
export interface UserRequestLogin {
    email: string
    password: string
    phone?: Number
    avatar?: string
    name?: string
    secondName?: string
    lastName?: string,
    doverenostNumber?: Number
    doverenostDate?: Date
    dateCreate?: Date
}

// Интерфейс для User при ответе авторизации
export interface UserResponceLogin {
    token: string
    currentUser: {
        email: string
        phone: Number
        password: string
        avatar?: string
        name: string
        secondName: string
        lastName: string
        doverenostNumber?: Number
        doverenostDate?: Date
        dateCreate?: Date
    }
}


// Интерфейс для User при запросе регистрации
export interface UserRequestRegister {
    email: string
    password: string
    phone: Number
    avatar?: string
    name: string
    secondName: string
    lastName: string
}

// Интерфейс для User при ответе регистрации
export interface UserResponceRegister {
    email: string
    phone: Number
    password: string
    avatar?: string
    name: string
    secondName: string
    lastName: string
    doverenostNumber?: Number
    doverenostDate?: Date
    dateCreate?: Date
}



// Интерфейс для state account
export interface AccountStateInterface {
    currentUser?: UserResponceRegister | null
    isLoggedIn: boolean | null
    token: string | null
    isLoading: boolean | null
    validationErrors: string[] | null
}
