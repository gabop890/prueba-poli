import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaisService } from '../../service/pais.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pais-dialog',
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './pais-dialog.component.html',
  styleUrl: './pais-dialog.component.css',
})
export class PaisDialogComponent {
  countryForm!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<PaisDialogComponent>);

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paisService: PaisService
  ) {
    this.createCrountryForm();
    this.countryForm.patchValue(data);
  }

  createCrountryForm() {
    this.countryForm = this.formBuilder.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      countryName: ['', Validators.required],
      population: ['', Validators.required],
      capital: ['', Validators.required],
      continentName: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    if (this.countryForm.valid) {
      if (this.data) {
        this.paisService.editCountry(this.countryForm.value).subscribe({
          next: (data) => {
            if (data) {
              Swal.fire({
                title:
                  'El pais ' + data.countryName + ' ha sido editado con exito',
                icon: 'success',
                draggable: true,
              });
              this.onNoClick();
            } else {
              Swal.fire({
                title: 'Verifique los datos',
                text: 'No se edito el pais',
                icon: 'info',
              });
            }
          },
          error: (err) => {
            console.error('Ha ocurrido un error al editar el pais ', err);
          },
          complete: () => {
            console.log('Se ha completado editar el pais');
          },
        });
      } else {
        this.paisService.addCountry(this.countryForm.value).subscribe({
          next: (data) => {
            if (data) {
              Swal.fire({
                title:
                  'El pais ' + data.countryName + ' ha sido guardado con exito',
                icon: 'success',
                draggable: true,
              });
              this.onNoClick();
            } else {
              Swal.fire({
                title: 'Verifique los datos',
                text: 'No se guardo el pais',
                icon: 'info',
              });
            }
          },
          error: (err) => {
            console.error('Ha ocurrido un error al guardar el pais ', err);
          },
          complete: () => {
            console.log('Se ha completado guardar el pais');
          },
        });
      }
    } else {
      return Object.values(this.countryForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
  }
}
