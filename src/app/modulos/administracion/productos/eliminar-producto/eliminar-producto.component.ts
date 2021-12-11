import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  
  id:string = '';
  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'nombre': ['',[Validators.required]],
    'precio': ['',[Validators.required]],
    'imagen': ['',[Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.eliminarProducto();
  }



  eliminarProducto(){
      
    let p = (this.id);

    this.servicioProducto.deleteProducto(p).subscribe((datos:ModeloProducto)=>{
      alert("Producto eliminado Correctamente...");
      this.router.navigate(["/administracion/listarProductos"])
    }, (error:any)=>{
      alert("Error eliminarnso el producto...");
    });
  }

}