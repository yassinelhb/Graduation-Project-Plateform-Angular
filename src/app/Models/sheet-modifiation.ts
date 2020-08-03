import {Entreprise} from './entreprise';
import {Categorie} from './categorie';
export class SheetModifiation {
  id: number;
  created: string;
  title: string;
  description: string;
  problematic: string;
  features: string;
  etat: string;
  categories: Categorie[];
  entreprise: Entreprise;

}
