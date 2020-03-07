import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  ideas: string [] = ['Spiderman', 'Avenger', 'Supersonic', 'Bay Boys'];
  view_spinner = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit():void {
  }

  buscar( event: any) {

    this.view_spinner = false;
    const valor = event.detail.value;

    if ( !valor ) {
      return;
    }

    this.view_spinner = true;

    this.moviesService.getSearchPelicula(valor)
      .subscribe( search => {
        this.peliculas = search['results'];
        this.view_spinner = false;
      });
  }

  async verDetalle(id: String) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
