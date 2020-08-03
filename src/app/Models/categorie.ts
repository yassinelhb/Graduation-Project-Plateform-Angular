import {Enseignant} from './enseignant';

export class Categorie {
  constructor(public name: string , public image: string , public exixtecommemodule: boolean){}
  enseignant: Enseignant;
  public id: number;
}
