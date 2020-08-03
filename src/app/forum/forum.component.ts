import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Question} from './Question';
import {Reponse} from './Response';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from './QuestionService';
import {ResponseSrvice} from './ResponseSrvice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../Models/user';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ForumComponent implements OnInit {
  Questions: Question[] = [];
  question: Question;
  Reponses: Reponse[] = [];
  reponse: Reponse;
  user: User;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private questionservice: QuestionService , private reponseservice: ResponseSrvice, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {}
  private questionf = new FormGroup({
    contenu: new FormControl('', [Validators.required]),
    etat: new FormControl('', )
  });
  private reponsef = new FormGroup({
    contenur: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.user = this.storage.get('user')
    this.questionservice.getQuestion()
      .subscribe(
        data => {
          this.Questions = data ;
        }
      );
  }
  /*showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }*/
  get Contenu() {
    return this.questionf.get('contenu');
  }
  get etat() {
    return this.questionf.get('etat');
  }
  ajouter() {
    this.question = new Question(this.questionf.value['contenu'], this.questionf.value['etat']);
    console.log(this.question);
    this.questionservice.ajouterquestion(this.question).subscribe( );
    this.ngOnInit();
    this.questionf.reset();
  }
  supprimer(id_Question: number) {
    console.log(this.question);
    this.questionservice.deleteqestion(id_Question).subscribe();
    this.ngOnInit();

  }
  mettreajour(id_Question: number) {
    console.log(this.question);
    this.questionservice.Mettreajour(id_Question).subscribe();
    this.ngOnInit();
  }
  ajouterR(id_Question: number) {
    this.reponse = new Reponse(this.reponsef.value['contenu']);
    console.log(this.reponse);
    this.reponseservice.ajouterReponse(id_Question, this.reponse).subscribe();
    this.questionf.reset();
  }

  get Contenur(){
  return this.reponsef.get('contenur');
}

  /*commenter(id : number){
    for(let q of this.Questions) {
      if (q.id_Question == id)
        this.Contenur.setValue(q.conetnu_Question);
      console.log(q.conetnu_Question);
      this.showformreponse=false;
    }
  }*/
}
