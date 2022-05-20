import { Byte } from "@angular/compiler/src/util"
import { Publicacion } from "./publicacion.interface"

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
    fotoPerfil: Byte[],
    publicaciones: Publicacion[],
    seguidores: userCompleto[],
    seguidos: userCompleto[]
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