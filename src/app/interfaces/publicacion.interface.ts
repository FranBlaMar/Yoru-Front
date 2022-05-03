import { Byte } from "@angular/compiler/src/util";
import { userCompleto } from "./user.interface";

export interface Publicacion{
    titulo: String,
    imagen: Byte[],
    autor: userCompleto
}