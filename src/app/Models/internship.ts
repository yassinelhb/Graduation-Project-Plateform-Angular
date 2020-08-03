import {Categorie} from './categorie';
import {Entreprise} from './entreprise';
import {Etudiant} from './etudiant';
import {Enseignantsheet} from './enseignantsheet';

export class Internship {
  id: number;
  pdf: string;
  startDate: string;
  endDate: string;
  entreprise: Entreprise;
  etudiant: Etudiant;
}
