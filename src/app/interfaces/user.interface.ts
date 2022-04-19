export interface userLogin{
    email: string,
    password: string
}

export interface userCompleto{
    userName: string,
    password: string,
    email: string,
    aboutMe: string,
    numeroPublicaciones: number,
    numeroSeguidores: number,
    numeroSeguidos: number
}

export interface user{
    email: string
}