import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-page',
  imports: [RouterLink],
  templateUrl: './InfoPage.component.html',
})
export class InfoPageComponent implements OnInit{
  id!: string;
  videojuego: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.cargarDatos();

  }

  cargarDatos() {
  this.http.get<any>(`http://localhost:3000/videogames/${this.id}`).subscribe(videojuego => {
    this.videojuego = videojuego;
    this.cdr.detectChanges();
  });
}


 }
