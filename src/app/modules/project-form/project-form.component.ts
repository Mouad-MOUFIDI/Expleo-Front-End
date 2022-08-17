import { ProjetServiceService } from './../../projet-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Projet } from 'src/app/projet';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  entite : string = "";
  projet=new Projet();
  form: FormGroup;
  projets:Projet[];

  constructor(private fb: FormBuilder,
    private projetService: ProjetServiceService
    ) {
      this.projet=new Projet();
      this.form = fb.group({
        nomProjet : [''],
        nomDepartement : [''],
        entite : [''],
        sop:[''],
        codeProjet: [''],
        lot: [''],
        lieuActivite:['']
      })
  }

  populateProject(projet: Projet){
    projet.nomProjet = this.form.value.nomProjet;
    projet.nomDepartement = this.form.value.nomDepartement;
    projet.enite= this.form.value.entite;
    if(this.form.value.enite==="operationnel"){
      projet.sop = this.form.value.sop;
      projet.lot = this.form.value.lot;
      projet.codeProjet = this.form.value.codeProjet;
      console.log("If statement works!")
    }else{
      projet.sop='';
      projet.lot='';
      projet.codeProjet='';
    }
    projet.lieuActivite=this.form.value.lieuActivite;
    return projet;
  }

  onSubmit(projet: Projet): void {
    console.log(projet)
    this.projetService.save(this.populateProject(projet))
    .subscribe(result=>{
      console.log(result)
      this.refreshProjet()
      console.log(this.projets+"TEST")
    })
  }

  refreshProjet(): void {
    this.projetService.getProjets()
      .subscribe(data => {
        console.log(data)
        this.projets=data;
        console.log(this.projets)
      },err=>{
        console.log(err);
      })
      console.log(this.projets)
  }

  ngOnInit(): void {
    this.refreshProjet()
  }

}
