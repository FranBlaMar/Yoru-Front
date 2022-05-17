import { Byte } from "@angular/compiler/src/util"

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
    numeroSeguidos: number,
    fotoPerfil: Byte[]
}

export interface userRegistro{
    userName: string,
    password: string,
    email: string,
    aboutMe: string,
    numeroPublicaciones: number,
    numeroSeguidores: number,
    numeroSeguidos: number,
    fotoPerfil: File
}

export interface user{
    email: string
}