import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { CatalogoComponent } from './componentes/usuario/catalogo/catalogo.component';
import { DashboardComponent } from './componentes/admin/dashboard/dashboard.component';
import { TurnoComponent } from './componentes/usuario/turno/turno.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { AdminCatalogoComponent } from './componentes/admin/admin-catalogo/admin-catalogo.component';



// Constantes del Guardian de rutas
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']); // Sin credenciales redirige al Login
const redirectLoggedInToItems = () => redirectLoggedInTo(['/auth/dashboard']);     // Con credenciales redirige al dashboard

const routes: Routes = [
  {path: '', redirectTo: 'catalogo', pathMatch: 'full'},
  
  {path: 'catalogo',component: CatalogoComponent,             canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  {path: 'turno',component: TurnoComponent,             canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  
  //LOGIN
  
  {path: 'auth',component: LoginComponent,                     canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
 
  //AUTH
  {path: 'auth/dashboard',component: DashboardComponent,             canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: 'auth/catalogo',component: AdminCatalogoComponent,             canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  
  {path: '**', redirectTo: 'catalogo', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
