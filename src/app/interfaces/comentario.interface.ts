import { userCompleto } from "./user.interface";

export interface Comentario{
    idComentario: number,
    cuerpoComentario: string,
    autor: userCompleto
}