import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaisService } from '../../service/pais.service';
import { Pais } from '../../model/pais';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-detalle-pais',
  imports: [MatCardModule, MatButtonModule, MatListModule, RouterModule],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css',
})
export class DetallePaisComponent implements OnInit {
  idPais!: string;
  pais!: Pais;

  constructor(
    private activeRoute: ActivatedRoute,
    private paisService: PaisService
  ) {
    this.idPais = this.activeRoute.snapshot.paramMap.get('id')!;
    if (this.idPais) {
      this.getCountryById();
    }
  }

  ngOnInit(): void {}

  getCountryById() {
    let paises = this.paisService.getPaises();
    let paisTemp = paises.filter((x) => x.id === this.idPais);
    this.pais = paisTemp[0];
    console.log('pais: ', this.pais);
  }
}
