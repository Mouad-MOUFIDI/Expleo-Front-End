import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PilotageComponent } from './modules/pilotage/pilotage.component';
import { DemandeCongeComponent } from './shared/widgets/demande-conge/demande-conge.component';
import { ProjectFormComponent } from './modules/project-form/project-form.component';
import {LoginComponent } from './login/login.component';
import { ComfirmPasswordComponent } from './comfirm-password/comfirm-password.component';
import { CongeComponentComponent } from './shared/widgets/congeComponent/congeComponent.component';
import { DemandeMultipleDaysComponent } from './shared/widgets/demandeMultipleDays/demandeMultipleDays.component';
// import { MultiDatesComponent } from './shared/widgets/multiDates/multiDates.component';

const routes: Routes = [{
  path:'',
  component:DefaultComponent,
  children:[
    {
      path:'',
      component:DashboardComponent
    },
    {
      path:'pilotage',
      component:PilotageComponent,
    },
    {
      path:'congeComponent',
      component:CongeComponentComponent,
      children:[
        {
          path:'demandeConge',
          component:DemandeCongeComponent,
          // outlet:'rangeConge'
        },
        {
          path:'demandeMultipleDays',
          component:DemandeMultipleDaysComponent,
          // outlet:'multipleConge'
        }
      ]
    },
    {
      path:'projet',
      component:ProjectFormComponent,
    }
  ]
}];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
