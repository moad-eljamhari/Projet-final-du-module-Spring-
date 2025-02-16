import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {
  actor: any;
  movies: any[] = [];
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,  // Inject Router
    private actorService: ActorService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActorDetails(id).subscribe(data => {
      this.actor = data;
    });
    this.actorService.getActorMovies(id).subscribe(data => {
      this.movies = data.cast;
    });
  }

  // Navigate to movie detail page
  viewMovieDetail(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}
