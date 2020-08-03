import { Component, OnInit } from '@angular/core';
import { SoutenanceService } from '../soutenance/services/SoutenanceServices';
import { Soutenance } from '../soutenance/entities/Soutenance';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent  implements OnInit{
  data: any;
  soutenances:Soutenance[]
  note1:number=0;
  note2:number=0;
  note3:number=0;
  note4:number=0;
  constructor(private soutenanceService:SoutenanceService) {
   
    
 }
ngOnInit(){
  console.log(this.note1)
  this.soutenanceService.getSoutenance().subscribe(datas=>{
    this.soutenances=datas;
    this.soutenances.forEach((element)=>{
     
      if(element.noteSoutenance<5){
      
        this.note1++
      }else if (element.noteSoutenance>=5 && element.noteSoutenance<=10){
        
        this.note2++
      }else if (element.noteSoutenance>=10&&element.noteSoutenance<=15){
        
        this.note3++
      }else{
        console.log(element.noteSoutenance)
        this.note4++
        console.log("jjj")
      }
    });console.log(this.note4);
    this.data = {
      labels: ['0 < Note < 5 ', '5 < Note < 10 ', '10 < Note < 15 ', '15 < Note < 20 '],
      datasets: [
          {
              label: 'Statistique Note des Soutenances',
              backgroundColor: '#191970',
              borderColor: '#191970',
              data: [this.note1,this.note2,this.note3,this.note4]
          }
          
      ]
    }
  }
  )

}
  

}
