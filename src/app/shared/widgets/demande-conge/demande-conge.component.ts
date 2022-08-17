import { Conge } from 'src/app/conge';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray,Validators } from '@angular/forms';
import { CongeServiceService } from 'src/app/conge-service.service';
import { RangeInterface } from 'src/app/rangeInterface';
import { MessageService } from 'src/app/message.service';
import { map } from 'highcharts';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.css']
})
export class DemandeCongeComponent implements OnInit {
  minDate = new Date();
  buttonFilterDisabled :boolean=false;
  solde:any;
  diffSolde:number;
  daysOfRanges:number=0;
  nbrOfDaysChecked: number=0;
  conge:Conge=new Conge()
  conges:Conge[]
  form: FormGroup;
  ranges_formArray: FormArray
  isChecked: FormControl
  myMap= new Map <number, RangeInterface>();
  ranges: RangeInterface[] = []
  motif:FormControl
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  @Output() onCongeRangeUpdated = new EventEmitter();

  constructor(private fb : FormBuilder,
    private congeService:CongeServiceService,
    // private messageService:MessageService
  ) {
    this.solde=18;
    this.form=fb.group({
      motif: [''],
      ranges_formArray: this.fb.array([]),
    });
  }

  createFormControls() {
    this.motif= new FormControl('')
    this.range.controls['start'] = new FormControl('');
    this.range.controls['end'] = new FormControl('');
    this.ranges_formArray = new FormArray([]);
  }

  createItem(): FormGroup {
    return this.fb.group({
      start: '',
      end: '',
    });
  }
  createFormVariables() {
    this.form = new FormGroup({
      motif : this.motif,
      start: this.range.controls['start'],
      end: this.range.controls['end'],
      ranges_formArray: this.ranges_formArray,
    });
  }
  ngOnInit() {
    this.createFormControls();
    this.createFormVariables();
  }

  addPM(): void {
    this.ranges_formArray.push(
      this.fb.group({
        start: this.range.controls['start'].value,
        end: this.range.controls['end'].value,
      })
    );
    console.log('list after addition:' + this.ranges_formArray.value);
    for (let i = 0; i < this.ranges_formArray.length; i++) {
      console.log(this.ranges_formArray.at(i).value);
    }
    this.range.controls['start'].reset();
    this.range.controls['end'].reset();
    this.daysOfRanges=0
    this.updateNbrOfDays()
  }

  removeRange(index: number) {
    this.ranges_formArray.removeAt(index);
    this.myMap.delete(index)
    this.daysOfRanges=0
    this.updateNbrOfDays()
    this.updateNbrOfDaysChecked()
  }

  get rangesFormArray() {
    return this.ranges_formArray.value as FormArray;
  }

  onCheckboxChange(event: any, index : number) {
    if(event.checked){
      this.myMap.set(index,this.ranges_formArray.at(index).value)
      this.updateNbrOfDaysChecked()

    } else{
      this.myMap.delete(index)
      this.updateNbrOfDaysChecked()
    }
  }

//-------------
  updateNbrOfDays(){
    for (let range of this.form.get('ranges_formArray')!.value){
      this.daysOfRanges=this.daysOfRanges+this.dateAdapter(range.start,range.end)
    }
  }

  updateNbrOfDaysChecked(){
    this.nbrOfDaysChecked=0
    this.myMap.forEach((value : RangeInterface) => {
      this.nbrOfDaysChecked+=this.dateAdapter(value.start,value.end)
    })
    this.onCongeRangeUpdated.emit(this.populateConge().rangesArray)
  }

  dateAdapter(date1:Date , date2:Date):number{
    let startD=new Date(date1)
    let endD=new Date(date2)
    startD.setTime(startD.getTime() - new Date().getTimezoneOffset()*60*1000)
    endD.setTime(endD.getTime() - new Date().getTimezoneOffset()*60*1000)
    return this.diff(startD, endD)
  }

  populateConge() :Conge{
    this.conge.motif=this.form.value.motif;
    this.conge.solde=this.diffSolde;
    this.conge.rangesArray=[]
    this.myMap.forEach((value:RangeInterface) => {
      this.conge.rangesArray.push(value);
    })
    return this.conge;
  }

  diff(start: Date,end :Date): number{
    var date1 = new Date(start);
    var date2 = new Date(end);
    var Diff_temps = date2.getTime() - date1.getTime();
    var Diff_jours = Diff_temps / (1000 * 3600 * 24);
    if(Diff_jours==0) return 0;
    // return ~~Diff_jours
    return Math.abs(~Diff_jours);
  }

  soldeRemainings() :number {
    this.diffSolde=this.solde-this.daysOfRanges;
    if(this.solde-this.daysOfRanges<=0){
      this.diffSolde=0;
    }
    return this.diffSolde;
  }

}


