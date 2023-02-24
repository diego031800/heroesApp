import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    private heroe_s: HeroesService,
    private router: Router,
    private _snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroe_s.getHeroe(id))
      )
      .subscribe((heroe: Heroe) => this.heroe = heroe);
  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroe_s.actualizarHeroe(this.heroe)
        .subscribe( heroe => {
          this.mostrarSnackBar('Registro actualizado.')
        });
    } else {
      this.heroe_s.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar/', heroe.id]);
          this.mostrarSnackBar('Registro creado.');
        })
    }
  }

  borrarHeroe () {
    const dialog = this.dialog.open( ConfirmarComponent, {
      height: '150px',
      width: '350px',
      data: this.heroe
    } )

    dialog.afterClosed()
      .subscribe(result => {
        if (result) {
          this.heroe_s.borrarHeroe(this.heroe.id!)
            .subscribe( resp => {
              this.router.navigate(['/heroes']);
            })
        }
      })

  }

  mostrarSnackBar( mensaje: string ) {
    this._snackbar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
