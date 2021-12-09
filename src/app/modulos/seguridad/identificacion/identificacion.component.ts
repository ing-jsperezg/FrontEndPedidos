import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJs from "crypto-js";
import { Router } from '@angular/router';
//const cryptoJs = require("crypto-js");
@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.email]],
    'clave': ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private sevicioSeguridad: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  identificarUsuario(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let claveCifrada = cryptoJs.MD5(clave).toString();
    this.sevicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos:any)=>{

      this.sevicioSeguridad.almacenarSesion(datos);
      this.router.navigate(['/inicio']);
      //ok
      //alert("Datos Correctos!")
    }, (error:any)=>{
      //ko
      alert("Datos no válidos!")
    })
  }
}
