import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VideogamesService } from '../../services/Videogames.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newvideogame',
  templateUrl: './newvideogame.component.html',
  imports: [ReactiveFormsModule, RouterLink, CommonModule]
})
export class NewVideogameComponent {
  videojuegoForm: FormGroup;


  constructor(private fb: FormBuilder, private videogamesService: VideogamesService, private router: Router) {
    this.videojuegoForm = this.fb.group({
    titulo: ['', Validators.required],
    genero: ['', Validators.required],
    plataforma: ['', Validators.required],
    fechaLanzamiento: ['', Validators.required],
    puntuacion: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    descripcion: ['', Validators.required],
    imagen: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });
  }

  guardarCambios() {
  if (this.videojuegoForm.valid) {
    const formValue = this.videojuegoForm.value;

    const nuevoVideojuego = {
      nombre: formValue.titulo,
      genero: formValue.genero,
      consolas: formValue.plataforma.split(',').map((p: string) => p.trim()),
      puntuacion_metacritic: Number(formValue.puntuacion),
      anio: Number(formValue.fechaLanzamiento),
      sinopsis: formValue.descripcion,
      imagen: formValue.imagen
    };

    this.videogamesService.addVideogame(nuevoVideojuego).subscribe({
      next: () => {
      alert('Videojuego añadido correctamente');
      this.router.navigate(['/list']);
    },

      error: (err) => {
        console.error('Error al añadir videojuego:', err);
        alert('No se pudo añadir el videojuego');
      },
    });
  } else {
    alert('Completa los campos obligatorios');
  }
}


  cancelar() {
    this.videojuegoForm.reset();
  }
}
