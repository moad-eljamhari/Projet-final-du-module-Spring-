import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { NewsComponent } from './components/whats-new/whats-new.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { ActorDetailComponent } from './components/actor-detail/actor-detail.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { TheatersComponent } from './components/theaters/theaters.component';
import { ShowtimesComponent } from './components/showtimes/showtimes.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'recommendations', component: RecommendationComponent },
  { path: 'news', component: NewsComponent },
  { path: 'actors', component: ActorListComponent },
  { path: 'actors/:id', component: ActorDetailComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'theaters', component: TheatersComponent },
  { path: 'showtimes', component: ShowtimesComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
