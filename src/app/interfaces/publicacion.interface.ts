import { Byte } from "@angular/compiler/src/util";
import { userCompleto } from "./user.interface";

export interface Publicacion{
    titulo: String,
    id: number,
    imagen: Byte[],
    autor: userCompleto,
    fechaPublicacion: Date,
    likes: number,
    liked: boolean
}