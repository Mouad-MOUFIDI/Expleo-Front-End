import { NgModule } from '@angular/core';
//Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MoisPointageComponent } from './widgets/mois-pointage/mois-pointage.component';
import { SemainePointageComponent } from './widgets/semaine-pointage/semaine-pointage.component';
import { JourPointageComponent } from './widgets/jour-pointage/jour-pointage.component';
import { DemandeCongeComponent } from './widgets/demande-conge/demande-conge.component';
import { DemandeMultipleDaysComponent } from './widgets/demandeMultipleDays/demandeMultipleDays.component';
import { CongeComponentComponent } from './widgets/congeComponent/congeComponent.component';
// import { MultiDatesComponent } from './widgets/multiDates/multiDates.component';


//Material & Form & Router
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {DatePipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
// ----------------------------------------------ngx
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MoisPointageComponent,
    SemainePointageComponent,
    JourPointageComponent,
    DemandeCongeComponent,
    DemandeMultipleDaysComponent,
    CongeComponentComponent,

  ],
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    RouterModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatChipsModule,
    MatSnackBarModule,
    NgxMultipleDatesModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MoisPointageComponent,
    SemainePointageComponent,
    JourPointageComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
