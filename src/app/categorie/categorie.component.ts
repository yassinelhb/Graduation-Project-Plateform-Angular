import {Component, Inject, OnInit} from '@angular/core';
import {Categorie} from '../Models/categorie';
import {CategorieService} from './CategorieService';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../forum/Question';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
 categories: Categorie[] = [];
 cat: Categorie;
  constructor(private catservice: CategorieService,@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  private categorief = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    image: new FormControl('', ),
    existe: new FormControl('', )
  });

  ngOnInit() {
    this.catservice.getcat()
      .subscribe(
        data => {
          this.categories = data ;
        }
      );
  }
  ajouter() {
    this.cat = new Categorie(this.categorief.value['nom'], this.categorief.value['image'] , this.categorief.value['existe']);
    console.log(this.cat);
    this.catservice.ajoutercat(this.cat).subscribe( );
    this.ngOnInit();
    this.categorief.reset();
  }
  supprimer(id_cat: number) {
    console.log(this.cat);
    this.catservice.deletecat(id_cat).subscribe();
    this.ngOnInit();

  }

}
