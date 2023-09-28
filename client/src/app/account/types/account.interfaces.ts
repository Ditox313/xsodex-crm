



// Интерфейс для User при запросе авторизации
export interface UserRequestLogin {
    email: string
    password: string
    phone?: string
    avatar?: string
    name?: string
    secondName?: string
    lastName?: string,
    doverenostNumber?: string
    doverenostDate?: string
}

// Интерфейс для User при ответе авторизации
export interface UserResponceLogin {
    token: string
    currentUser: {
        email: string
        phone: string
        password: string
        avatar?: string
        name: string
        secondName: string
        lastName: string
        doverenostNumber?: string
        doverenostDate?: string
        _id?: string
    }
}


// Интерфейс для User при запросе регистрации
export interface UserRequestRegister {
    email: string
    password: string
    phone: string
    avatar?: string
    name: string
    secondName: string
    lastName: string
}

// Интерфейс для User при ответе регистрации
export interface UserResponceRegister {
    email: string
    phone: string
    password: string
    avatar?: string
    name: string
    secondName: string
    lastName: string
    doverenostNumber?: string | undefined
    doverenostDate?: string | undefined
    _id?: string
}



// Интерфейс для state account
export interface AccountStateInterface {
    currentUser?: UserResponceRegister | null | undefined
    isLoggedIn: boolean | null
    token: string | null
    isLoading: boolean | null
    validationErrors: string[] | null
}

