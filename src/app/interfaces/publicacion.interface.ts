import { Byte } from "@angular/compiler/src/util";
import { userCompleto } from "./user.interface";

export interface Publicacion{
    titulo: String,
    idPublicacion: number,
    imagen: Byte[],
    autor: userCompleto,
    fechaPublicacion: Date,
    likes: number,
    liked: boolean
}