import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProducto } from '../modelos/producto.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url= 'http://localhost:3000';
  token: String = '';
  constructor(private http: HttpClient,
    private seguridadServicio: SeguridadService) { 
      this.token = this.seguridadServicio.obtenerToken();
    }

  obtenerRegistros(): Observable<ModeloProducto[]>{
    return this.http.get<ModeloProducto[]>(`${this.url}/productos`);
  }

  obtenerRegistroId(id: string): Observable<ModeloProducto>{
    return this.http.get<ModeloProducto>(`${this.url}/productos/${id}`);
  }

  crearProducto(producto: ModeloProducto): Observable<ModeloProducto>{
    return this.http.post<ModeloProducto>(`${this.url}/productos`, producto,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  actualizarProducto(producto: ModeloProducto): Observable<ModeloProducto>{
    return this.http.put<ModeloProducto>(`${this.url}/productos/${producto.id}`, producto,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  eliminarProducto(id: String): Observable<any>{
    return this.http.delete(`${this.url}/productos/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
