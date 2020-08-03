import { Etudiant } from './etudiant';
import { Enseignant } from './enseignant';

export class PfeNotification {
  id: number;
  note: string;
  title: string;
  vu: number;
  sendby: string;
  etudiant: Etudiant;
  enseignant: Enseignant;
}
