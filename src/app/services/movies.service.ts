import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[]= [];

  constructor(
    private http: HttpClient
  ) { }

  private executeQuery<T>( query: string) {
    query = `${URL}${query}&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getPopulares() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;


    return this.executeQuery<RespuestaMDB>(query);
  }

  getSearchPelicula(search: string) {
    const query = `/search/movie?include_adult=yes&query=${search}`;

    return this.executeQuery(query);
  }

  getFeature() {

    const hoy = new Date();
    const ultimoDia = new  Date(hoy.getFullYear(), hoy.getMonth()+1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if ( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.executeQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPeliculaDetalle( id: string) {
    return this.executeQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula( id: string) {
    return this.executeQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise( resolve => {
      this.executeQuery('/genre/movie/list?a=1')
        .subscribe( resp => {
          this.generos = resp['genres'];
          resolve(this.generos);
      });
    });
  }
}
