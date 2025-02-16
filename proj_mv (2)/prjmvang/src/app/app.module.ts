import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { AppRoutingModule } from './app-routing.module'; 
import { NewsService } from './services/news.service';
import { NewsComponent } from './components/whats-new/whats-new.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { ActorDetailComponent } from './components/actor-detail/actor-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { TheatersComponent } from './components/theaters/theaters.component';
import { ShowtimesComponent } from './components/showtimes/showtimes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    MovieDetailComponent,
    NavbarComponent,
    RecommendationComponent,
    NewsComponent,
    ActorListComponent,
    ActorDetailComponent,
    ChatbotComponent,
    TheatersComponent,
    ShowtimesComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    FormsModule,  
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      timeOut: 3000,                 
      closeButton: true,                
      progressBar: true,                
      newestOnTop: true,                
      preventDuplicates: true,           
      tapToDismiss: true,               
      toastClass: 'ngx-toastr'           
    }),
  ],
  providers: [NewsService], 
  bootstrap: [AppComponent],
})
export class AppModule {}
