import { Departement } from './departement';

export class Site {
    id:number;
    nom:string;
    adresse:string;
    maxPreValidateur:number;
    maxEncadrant:number;
    maxRapporteur:number;
    maxPresident:number;
    departements:Departement[];
}