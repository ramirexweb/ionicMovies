import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: string;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  }


  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  constructor(
    private moviesSerive: MoviesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.moviesSerive.getPeliculaDetalle(this.id)
      .subscribe( resp => {
        this.pelicula = resp;
      });

    this.moviesSerive.getActoresPelicula(this.id)
        .subscribe( resp => {
          this.actores = resp.cast;
        } );
        
  }

  regresar() {
    this.modalController.dismiss();
  }

  favorito() {

  }
}
