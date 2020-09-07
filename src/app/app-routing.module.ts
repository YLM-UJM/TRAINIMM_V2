import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './../app/login/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    //canLoad: [LoginGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'parametres',
    loadChildren: () => import('./parametres/parametres.module').then( m => m.ParametresPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'hebdomadaire',
    loadChildren: () => import('./hebdomadaire/hebdomadaire.module').then( m => m.HebdomadairePageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'surentrainement',
    loadChildren: () => import('./surentrainement/surentrainement.module').then( m => m.SurentrainementPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'blessure',
    loadChildren: () => import('./blessure/blessure.module').then( m => m.BlessurePageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'sommeil',
    loadChildren: () => import('./sommeil/sommeil.module').then( m => m.SommeilPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./parametres/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'instructions',
    loadChildren: () => import('./parametres/instructions/instructions.module').then( m => m.InstructionsPageModule)
  },
  {
    path: 'activites',
    loadChildren: () => import('./activites/activites.module').then( m => m.ActivitesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
