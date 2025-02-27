import { Component, inject, OnInit } from '@angular/core';
import { PaisService } from '../../service/pais.service';
import { Pais } from '../../model/pais';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PaisDialogComponent } from '../../dialogs/pais-dialog/pais-dialog.component';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paises',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './paises.component.html',
  styleUrl: './paises.component.css',
})
export class PaisesComponent implements OnInit {
  paises!: Pais[];
  readonly dialog = inject(MatDialog);

  constructor(private paisService: PaisService) {}
  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.paises = this.paisService.getPaises();
    console.log('paises', this.paises);
  }

  addCountry() {
    const dialogRef = this.dialog.open(PaisDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.getCountryList();
    });
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

  editCountry(data: Pais) {
    const dialogRef = this.dialog.open(PaisDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
          console.log("fin");
          
          this.getCountryList();
      },
    });
  }

  deleteCountry(id: string) {
    this.paisService.deletePais(id).subscribe({
      next: (data) => {
        if (data) {
          Swal.fire({
            title:
              'El pais ' + data.countryName + ' ha sido eliminado con exito',
            icon: 'success',
            draggable: true,
          });
          this.getCountryList()
        } else {
          Swal.fire({
            title: 'Verifique la base de datos',
            text: 'No se elimino el pais',
            icon: 'info',
          });
        }
      },
      error: (err) => {
        console.error(
          'Ha ocurrido un error al eliminar el pais ',
          err
        );
      },
      complete: () => {
        console.log('Se ha completado eliminar el pais');
      },
    });
  }
}
