import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroe_s: HeroesService) {}

  buscando() {
    this.heroe_s
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  opcionSeleccionada( evento:MatAutocompleteSelectedEvent ) {
    if (!evento.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const hereo: Heroe = evento.option.value;
    this.termino = hereo.superhero;

    this.heroe_s.getHeroe( hereo.id! )
      .subscribe( heroe => this.heroeSeleccionado = hereo)
  }
}
