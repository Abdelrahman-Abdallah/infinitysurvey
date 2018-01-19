import { DatebBaseComponent } from './survey/dateb-base/dateb-base.component';
import { ProfileeditComponent } from './profile/profileedit/profileedit.component';
import { ProfilehomeComponent } from './profile/profilehome/profilehome.component';
import { ViewWComponent } from './vie/view.component';
import { EditComponent } from './usersurvey/edit/edit.component';
import { InfoComponent } from './usersurvey/info/info.component';
import { QuestionsComponent } from './usersurvey/questions/questions.component';
import { AuthGuardService } from './auth-guard.service';
import { SurveyComponent } from './survey/survey.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { ProfileComponent } from './profile/profile.component';
import { GuestComponent } from './guestpage/guest.component';
import { UsersurveyComponent } from './usersurvey/usersurvey.component';
import { ResultsComponent } from './usersurvey/results/results.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from './login-guard.service';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
    {path: '', component: WelcomepageComponent },
    {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
    {path: 'signup', component: SignupComponent},
    {path: 'addsurvey', component: SurveyComponent , canActivate: [AuthGuardService]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
      {path: '' , redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: ProfilehomeComponent},
      {path: 'edit', component: ProfileeditComponent}
    ]},
    {path: 'survey/:id' , component: UsersurveyComponent, canActivate: [AuthGuardService], children: [
      /* {path: ':id', redirectTo: 'results' , pathMatch: 'full'}, */
      {path: '' , redirectTo: 'results', pathMatch: 'full'},
      {path: 'results' , component: ResultsComponent},
      {path: 'questions', component: QuestionsComponent},
      {path: 'info' , component: InfoComponent},
      {path: 'edit' , component: EditComponent}
    ]},
    {path: 'view/:id', component: GuestComponent},
    {path: 'not-found', component: ErrorComponent},
    {path: 'vieww/:id' , component : ViewWComponent},
    {path: 'database' , component: DatebBaseComponent},
    {path: '**' , redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
