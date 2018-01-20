import { DatebBaseComponent } from './survey/dateb-base/dateb-base.component';
import { ProfileService } from './profile.service';
import { ViewWComponent } from './vie/view.component';
import { LinksService } from './links.service';
import { GuestComponent } from './guestpage/guest.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthserviceService } from './Auth/authservice.service';
import { SurveyComponentControlService } from './survey/survey-component-control.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { SurveyComponent } from './survey/survey.component';
import { RadioComponent } from './survey/radio/radio.component';
import { TextareaComponent } from './survey/textarea/textarea.component';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './profile/profile.component';
import { CheckboxComponent } from './survey/checkbox/checkbox.component';
import { UsersurveyComponent } from './usersurvey/usersurvey.component';
import { ResultsComponent } from './usersurvey/results/results.component';
import { InfoComponent } from './usersurvey/info/info.component';
import { QuestionsComponent } from './usersurvey/questions/questions.component';
import { EditComponent } from './usersurvey/edit/edit.component';
import { SurveydataService } from './usersurvey/surveydata.service';
import { LoginGuardService } from './login-guard.service';
import { ErrorComponent } from './error/error.component';
import { SpinloaderComponent } from './loader/spinloader/spinloader.component';
import { LineloaderComponent } from './loader/lineloader/lineloader.component';
import { BarcharComponent } from './usersurvey/barchar/barchar.component';
import { ProfilehomeComponent } from './profile/profilehome/profilehome.component';
import { ProfileeditComponent } from './profile/profileedit/profileedit.component';
import { SurveytitleComponent } from './survey/surveytitle/surveytitle.component';
//import { EmailValidator } from './emailvalidator.directive';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomepageComponent,
    LoginComponent,
    SignupComponent,
    SurveyComponent,
    RadioComponent,
    TextareaComponent,
    ProfileComponent,
    CheckboxComponent,
    UsersurveyComponent,
    ResultsComponent,
    InfoComponent,
    QuestionsComponent,
    EditComponent,
    ErrorComponent,
    SpinloaderComponent,
    LineloaderComponent,
    GuestComponent,
    ViewWComponent,
    BarcharComponent,
    ProfilehomeComponent,
    ProfileeditComponent,
    //EmailValidator,
    DatebBaseComponent,
    SurveytitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [SurveyComponentControlService,
              AuthserviceService,
              AuthGuardService,
              SurveydataService,
              LoginGuardService,
              LinksService,
              ProfileService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
