import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Soutenance } from './entities/Soutenance';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SoutenanceService } from './services/SoutenanceServices';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { faCoffee, faPaperclip ,faPencilAlt,faEdit} from '@fortawesome/free-solid-svg-icons';
import { Calendar } from './entities/Calendar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-soutenance',
  templateUrl: './soutenance.component.html',
  styleUrls: ['./soutenance.component.scss']
})
@Injectable()
export class SoutenanceComponent implements OnInit {
    Soutenances:Soutenance[];
    Soutenancee:Soutenance;
    valuesJson:any;
    new=true
    form=false
    name:string;
    data: any[];
    options: any;
    faCoffee = faCoffee;
    faPaperclip = faPaperclip;
    faPencilAlt=faPencilAlt;
    calendarD=false;
    listeEvents:Calendar[]=[];
    listD=true;
    dat:any;
    showCalendar=false;
    private ngNavigatorShareService: NgNavigatorShareService;


    public soutenanceform:FormGroup= new FormGroup({
      titre:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      dateSoutenance:new FormControl('',[Validators.required]),
      noteSoutenance:new FormControl('',[Validators.required,Validators.max(20),Validators.min(0)]),
      salle:new FormControl() 
    })
      constructor(private soutenanceServices:SoutenanceService,private formBuilder:FormBuilder , public dialog: MatDialog,  ngNavigatorShareService: NgNavigatorShareService) {this.ngNavigatorShareService = ngNavigatorShareService; }
    
    
      ngOnInit() {
        this.soutenanceServices.getSoutenance().subscribe(data=>this.Soutenances=data)
  /* 
        this.data = [
          {
              "title": "SoutenanceTest",
              "start": "2019-12-01"
          },
          {
              "title": "Long Event",
              "start": "2019-12-07",
              "end": "2019-12-10"
          },
          {
              "title": "SoutenanceTest2",
              "start": "2019-12-09T16:00:00"
          },
          {
              "title": "SoutenanceTest",
              "start": "2019-12-16T16:00:00"
          },
          {
              "title": "Soutenance 1",
              "start": "2019-12-11",
              "end": "2019-12-13"
          }
      ]; */
      this.options = {
        plugins:[ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        defaultDate: '2019-12-01',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true
      };
        }



      addSoutenance(){
       
        this.Soutenancee=this.soutenanceform.value;
        this.valuesJson=JSON.stringify(this.Soutenancee);
        this.soutenanceServices.addSoutenance(this.valuesJson).subscribe(status=> {console.log(JSON.stringify(status));this.Soutenances.push(this.Soutenancee)})
        alert("Soutenance Ajouté")
      //  this.Soutenances.push(this.soutenanceform.value)
        this.listD=true
        this.calendarD=false
        this.form=false
        
      }
      
      deleteSoutenance(id_soutenance: number) {
        console.log(id_soutenance);
        this.soutenanceServices.deleteSoutenance(id_soutenance).subscribe(()=>this.Soutenances.forEach((element)=>{
          if(element.id==id_soutenance){
            this.Soutenances= this.Soutenances.filter(item=>item!==element);
          }
        })) 
    
      }
      ShowCalendar(){
        this.showCalendar=true;

      }
      calendar(){
        this.listeEvents=[]
        this.calendarD=true;
        this.listD=false;
        console.log(this.Soutenances)
        
        this.Soutenances.forEach((element)=>{
          console.log(element.titre);
          console.log(element.dateSoutenance);
    
         this.listeEvents.push({
           "title":element.titre,
           "start":element.dateSoutenance,
           
         })          
      
        })
        console.log(this.listeEvents)
        this.dat = this.listeEvents
      this.options = {
        plugins:[ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        defaultDate: '2019-02-01',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true,
        handleDateClick(e){
          console.log(e.dateStr)
      }
        
      };
      }
      openDialog(SoutenanceId:number): void {

        this.soutenanceServices.GetSoutenanceById(SoutenanceId).subscribe((data) =>{
         
          this.Soutenancee=data;
        
          const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '350px',
            data: {Soutenance: this.Soutenancee }
            
          });
         
        })
      
      }
      
      async shareApi() {
        try{
          const sharedResponse = await this.ngNavigatorShareService.share({
            
            title:'`Web Articles and Tutorials',
            text: 'Check out my blog — its worth looking.',
            url: 'www.codershood.info'
          });
          console.log(sharedResponse);
        } catch(error) {
          console.log('You app is not shared, reason: ',error);
        }
        
      }
      title = 'app';
      share() {
        this.ngNavigatorShareService.share({
          title: 'My Awesome app',
          text: 'hey check out my Share button',
          url: 'https://developers.google.com/web'
        }).then( (response) => {
          console.log(response);
        })
        .catch( (error) => {
          console.log(error);
        });
      }
      }

      @Component({
        selector: 'dialog-overview-example-dialog',
        templateUrl: './dialog.html',
      })
      export class DialogOverviewExampleDialog  {
        public refuseForm:FormGroup= new FormGroup({
          titre:new FormControl(),
          description:new FormControl(),
          dateSoutenance:new FormControl(),
          noteSoutenance:new FormControl(),
          salle:new FormControl()})
          soutenance : Soutenance ;
          valuesJson:any;
          ref : any ;
        constructor(
          public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
          @Inject(MAT_DIALOG_DATA) public data: any , private soutenanceService: SoutenanceService,
          private formBuilder:FormBuilder) {}
          // ngOnInit() {
          // this.refuseForm = this.formBuilder.group({
          //   name: ['']})}
        onNoClick(): void {
          this.dialogRef.close();
        }
        RefuseMod(id:number,SoutenanceId :number) {
        //  this.soutenanceService.GetSoutenanceById(SoutenanceId).subscribe((values) =>{
         //   this.soutenance=values;
            this.soutenance=this.refuseForm.value;
            this.valuesJson=JSON.stringify(this.soutenance);
            console.log(this.valuesJson)

         this.soutenanceService.ModifierSoutenance(id,this.valuesJson).subscribe((data) =>{
          });
          this.dialogRef.close();
        //  })
        }
       
      }
