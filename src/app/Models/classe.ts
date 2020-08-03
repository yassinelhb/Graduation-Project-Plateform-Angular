import { Etudiant } from './etudiant';
import { Specialite } from './specialite';

export class Classe {
    id:number;
    numero:number;
    anneeDeDebut:number;
    etudiants:Etudiant[];
    specialite:Specialite;
}