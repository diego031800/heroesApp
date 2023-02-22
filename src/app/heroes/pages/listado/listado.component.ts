import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    mat-card {
      margin-top: 20px;
    }
  `]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(
    private heroes_s: HeroesService
  ) {}

  ngOnInit(): void {
    this.heroes_s.getHeroes()
      .subscribe((data) => this.heroes = data);
  }
}
