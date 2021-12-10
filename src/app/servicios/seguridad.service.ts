import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = 'http://localhost:3000';
  datosUsuarioSession = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) { 
    this.verificarSesionActual();
  }

  verificarSesionActual(){
    let datos = this.obtenerInformacionSesion();
    if(datos){
      this.refrescarDatosSesion(datos);
    }
  }

  refrescarDatosSesion(datos: ModeloIdentificar){
    this.datosUsuarioSession.next(datos);
  }

  obtenerDatosSesionUsuarioEnSesion(){
    return this.datosUsuarioSession.asObservable();
  }

  Identificar(usuario:string, clave:string): Observable<ModeloIdentificar>{
    return this.http.post<ModeloIdentificar>(`${this.url}/identificarPersona`, {
      usaurio: usuario,
      clave: clave
    },
    {
      headers: new HttpHeaders({

      })
    })
  }

  almacenarSesion(datos:ModeloIdentificar){
    datos.estaIdentificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion", stringDatos);
    this.refrescarDatosSesion(datos);
  }

  obtenerInformacionSesion(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }

  eliminarInformacionSesion(){
    localStorage.removeItem("datosSesion");
    this.refrescarDatosSesion(new ModeloIdentificar());
  }

  seIncioSesion(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }

  obtenerToken(){
    let datorString = localStorage.getItem("datosSesion");
    if(datorString){
      let datos = JSON.parse(datorString);
      return datos.tk;
    }else{
      return ''
    }
  }
}
