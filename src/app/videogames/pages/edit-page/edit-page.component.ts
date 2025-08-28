import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  imports: [ReactiveFormsModule]
})
export class EditPageComponent implements OnInit {
  videojuegoForm = new FormGroup({
    titulo: new FormControl(''),
    genero: new FormControl(''),
    plataforma: new FormControl('')
  });

  id!: string;
  videojuego: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log("id: " , this.id)
    this.cargarDatos();
  }

  cargarDatos() {
  this.http.get<any>(`http://localhost:3000/videogames/${this.id}`).subscribe(videojuego => {
    this.videojuego = videojuego;
    setTimeout(() => {
      this.videojuegoForm.setValue({
        titulo: videojuego.nombre,
        genero: videojuego.genero,
        plataforma: videojuego.consolas
      });
      this.cdr.detectChanges()
    });
  });
}


  guardarCambios() {
  const formValues = this.videojuegoForm.value;

  const videojuegoActualizado = {
    ...this.videojuego,
    nombre: formValues.titulo,
    genero: formValues.genero,
    consolas: formValues.plataforma
  };

  this.http.put(`http://localhost:3000/videogames/${this.id}`, videojuegoActualizado)
    .subscribe(() => {
      alert('Videojuego actualizado correctamente');
      this.router.navigate(['/list']);
    });
}


  cancelar() {
    this.router.navigate(['/list']);
  }
}
