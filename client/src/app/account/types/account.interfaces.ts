



// Интерфейс для User при запросе авторизации
export interface UserRequestLogin {
    email: string
    password: string
    phone?: string
    avatar?: string
    name?: string
    secondName?: string
    lastName?: string,
    doverenostNumber?: string,
    doverenostNumber2?: string,
    doverenostDate?: string
    doverenostDate2?: string
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
        doverenostNumber2?: string
        doverenostDate?: string
        doverenostDate2?: string
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
    doverenostNumber?: string | undefined,
    doverenostNumber2?: string | undefined,
    doverenostDate?: string | undefined
    doverenostDate2?: string | undefined
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

