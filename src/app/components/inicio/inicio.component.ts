import { Component } from '@angular/core';
import { PaisService } from '../../service/pais.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { Pais } from '../../model/pais';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [MatCardModule, MatButtonModule, MatGridListModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  paises!: Pais[];

  constructor(private paisService: PaisService, private router: Router) {
    this.getCountryList();
  }

  getCountryList() {
    this.paisService.getAllCountries().subscribe({
      next: (data) => {
        if (data) {
          this.paises = data;
        } else {
          Swal.fire({
            title: 'Verifique la base de datos',
            text: 'No se cargo la lista de paises',
            icon: 'info',
          });
        }
      },
      error: (err) => {
        console.error(
          'Ha ocurrido un error al consultar la lista de paises ',
          err
        );
      },
      complete: () => {
        console.log('Se ha completado la consulta de paises');
      },
    });
  }

  goPaises() {
    this.router.navigate(['/dashboard', 'paises']).then(
      (nav) => {
        this.paisService.setPaises(this.paises)
        console.log(nav); // true if navigation is successful
      },
      (err) => {
        console.log(err); // when there's an error
      }
    );
  }
}
