import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundPageModule } from './paginas/not-found/not-found.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'olvide-contrasenha',
    loadChildren: () => import('./paginas/olvide-contrasenha/olvide-contrasenha.module').then( m => m.OlvideContrasenhaPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./paginas/index/index.module').then( m => m.IndexPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'verClases',
    loadChildren: () => import('./paginas/ver-clases/ver-clases.module').then( m => m.VerClasesPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./paginas/not-found/not-found.module').then( m => m.NotFoundPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules },),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
