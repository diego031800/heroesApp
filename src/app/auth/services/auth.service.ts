import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interfaces';
import { tap, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(
    private http: HttpClient,
  ) { }

  get auth(): Auth {
    return { ...this._auth! };
  }

  verificarAutentificacion():Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<Auth>(`${ this.baseurl }/usuarios/1`)
                    .pipe(
                      map(auth => {
                        this._auth = auth;
                        return true;
                      })
                    );
  }

  login() {
    return this.http.get<Auth>(`${ this.baseurl }/usuarios/1`)
            .pipe(
              tap( auth => this._auth = auth),
              tap( auth => localStorage.setItem('token', auth.id))
            )
  }
}
