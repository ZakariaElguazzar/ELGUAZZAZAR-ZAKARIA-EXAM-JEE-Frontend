import { Routes } from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {authenticationGuard} from './guards/authentication/authentication.guard';
import {LoginComponent} from './login/login.component';
import {NotAuthorizedComponent} from './not-authorized/not-authorized.component';
import {AdminTemplateComponent} from './admin-template/admin-template.component';

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path:"admin",component:AdminTemplateComponent,canActivate:[authenticationGuard],children:[
      {path: "clients", component: ClientsComponent},
      {path: "notAuthorized", component: NotAuthorizedComponent},
    ]},
];
