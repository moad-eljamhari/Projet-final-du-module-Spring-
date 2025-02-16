import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {
  actors: any[] = [];
  searchQuery: string = '';  // Model for the search input

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.loadPopularActors();
  }

  // Load popular actors initially
  loadPopularActors(): void {
    this.actorService.getPopularActors().subscribe(data => {
      this.actors = data.results;
    });
  }

  // Search actors by name
  onSearchByName(): void {
    if (this.searchQuery.trim()) {
      this.actorService.searchActorsByName(this.searchQuery).subscribe(data => {
        this.actors = data.results;
      });
    } else {
      this.loadPopularActors();  // If search query is empty, show popular actors
    }
  }
}
