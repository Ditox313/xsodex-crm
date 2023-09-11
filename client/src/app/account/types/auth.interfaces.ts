

// Интерфейс для User при запросе авторизации
export interface UserRequestLogin {
    email: string,
    password: string,
    phone?: Number,
    avatar?: string,
    name?: string,
    secondName?: string,
    lastName?: string,
    doverenostNumber?: Number,
    doverenostDate?: Date,
    dateCreate?: Date,
}

// Интерфейс для User при ответе авторизации
export interface UserResponceLogin {
    token: string,
    currentUser: {
        email: string,
        phone: Number,
        password: string,
        avatar?: string,
        name: string,
        secondName: string,
        lastName: string,
        doverenostNumber?: Number,
        doverenostDate?: Date,
        dateCreate: Date,
    }
}
