import {Etudiant} from '../Models/etudiant';

export class Question {
  public id_Question: number;
  etudiant: Etudiant;
  constructor( public conetnu_Question: string, public question_resolu: boolean){}

}

