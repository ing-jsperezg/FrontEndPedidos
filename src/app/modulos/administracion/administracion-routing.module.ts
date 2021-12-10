import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';

const routes: Routes = [
  {
    path: 'crearPersona',
    component:CrearPersonaComponent
  },
  {
    path:'editarPersona',
    component:EditarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path:'listarProductos', 
    component:BuscarProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crearProducto',
    component:CrearProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path:'editarProducto/:id',
    component:EditarProductoComponent,
    canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
