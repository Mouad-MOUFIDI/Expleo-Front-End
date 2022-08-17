
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {Observable, Observer, range} from 'rxjs';
import { Conge } from 'src/app/conge';
import { CongeServiceService } from 'src/app/conge-service.service';
import { MessageService } from 'src/app/message.service';
import { RangeInterface } from 'src/app/rangeInterface';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DemandeCongeComponent } from '../demande-conge/demande-conge.component';

export interface TabItem {
  label: string;
  route :string
}
@Component({
  selector: 'app-congeComponent',
  templateUrl: './congeComponent.component.html',
  styleUrls: ['./congeComponent.component.css']
})
export class CongeComponentComponent implements OnInit {
  conges:Conge[]
  solde : number = 18
  diffSolde : number
  nbrOfSelectedDates : number = 0
  motifs : string[] = [
    "Maladie",
    "Payé",
    "Sans solde",
    "Formation",
    "Maternité"
  ];
  selectedMotif : string
  conge : Conge = new Conge();
  model : Date[] = []

  constructor(private congeService:CongeServiceService, private _snackBar: MatSnackBar){}

  ngOnInit() {}

  updateNuberOfSelectedDates(){
    for (let i = 0; i < this.conge.rangesArray.length; i++) {
      this.nbrOfSelectedDates=this.nbrOfSelectedDates+this.dateAdapter(this.conge.rangesArray[i].start,this.conge.rangesArray[i].end)
    }
    for(let i = 0; i < this.conge.multipleDays.length; i++) {
      this.nbrOfSelectedDates++
    }
  }

  dateAdapter(date1:Date , date2:Date):number{
    let startD=new Date(date1)
    let endD=new Date(date2)
    startD.setTime(startD.getTime() - new Date().getTimezoneOffset()*60*1000)
    endD.setTime(endD.getTime() - new Date().getTimezoneOffset()*60*1000)
    return this.diff(startD, endD)
  }

  diff(start: Date,end :Date): number{
    var date1 = new Date(start);
    var date2 = new Date(end);
    var Diff_temps = date2.getTime() - date1.getTime();
    var Diff_jours = Diff_temps / (1000 * 3600 * 24);
    if(Diff_jours==0) return 0;
    return Math.abs(~Diff_jours);
  }

  updateCongeRange(ranges:RangeInterface[]){
    this.conge.rangesArray=ranges
    console.log("range updated ",this.conge)
    this.nbrOfSelectedDates=0
    this.updateNuberOfSelectedDates()
    console.log("[nbr of selected days] : ", this.nbrOfSelectedDates );

  }

  updateCongeMultiDays(multipleDays:Date[]){
    this.conge.multipleDays=multipleDays
    console.log("multiple days updated ",this.conge)
    this.nbrOfSelectedDates=0
    this.updateNuberOfSelectedDates()
    console.log("[nbr of selected days] : ", this.nbrOfSelectedDates );
  }

  soldeRemainings() :number {
    this.diffSolde=this.solde-this.nbrOfSelectedDates;
    if(this.solde-this.nbrOfSelectedDates<=0){
      this.diffSolde=0;
    }
    return this.diffSolde;
  }

  refreshConge(): void {
    this.congeService.getConges()
      .subscribe(data => {
        // console.log(data)
        this.conges=data;
      },err=>{
        console.log(err);
      })
  }

  onSubmit(){
    this.conge.motif=this.selectedMotif
    this.conge.solde=this.diffSolde
    console.log("[final test] : ", this.conge)
    this.congeService.save(this.conge)
    .subscribe(result=>{
      // console.log(result)
      this.refreshConge()
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }


}
