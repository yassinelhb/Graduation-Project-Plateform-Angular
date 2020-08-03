import { Component, OnInit, Input } from '@angular/core';
import { Classe } from '../Models/classe';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'util';
import { ClassesService } from './classes.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Error } from '../Models/error';
import { Location } from '@angular/common';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  loading = true;
  classes: Classe[] = [];
  departementId: number;
  hasEcole = true;
  constructor(private location: Location,private route: ActivatedRoute, private router: Router, private classesService: ClassesService, private modalService: NgbModal) {
    this.route.params.subscribe(params => {
      this.departementId = params['id'];
      if (isUndefined(this.departementId)) router.navigate(['/specialites']);
    });
  }

  ngOnInit() {
    console.log(this.departementId);
    if (isUndefined(this.departementId)) this.router.navigate(['/specialite']);
    this.loading = true
    this.classesService.getAll(this.departementId).subscribe((success) => {
      this.classes = success;
      this.classes.sort((a,b)=>{
        if (a.numero>b.numero) return 1
        else if (a.numero<b.numero) return -1
        else return 0
      })
      this.loading = false;
    })
  }
  supprimer(id: number) {
    this.classesService.supprimer(id).subscribe((success) => {
      this.classesService.getAll(this.departementId).subscribe(success => {
        this.classes = success;
        this.classes.sort((a,b)=>{
          if (a.numero>b.numero) return 1
          else if (a.numero<b.numero) return -1
          else return 0
        })
      })
    })
  }

  details(classe: Classe) {
    this.router.navigate(['/etudiants/' + classe.id]);
  }
  goBack() {
    this.location.back();
  } 

  openForm() {
    this.classesService.ajouter(this.departementId).subscribe(
      success => {
        console.log(success);
        this.loading = true
        this.classesService.getAll(this.departementId).subscribe((success) => {
          this.classes = success;
          this.classes.sort((a,b)=>{
            if (a.numero>b.numero) return 1
            else if (a.numero<b.numero) return -1
            else return 0
          })
          this.loading = false;
        })
      }
    )
  }
}