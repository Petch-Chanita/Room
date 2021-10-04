import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApphomeComponent } from './component/apphome/apphome.component';
import { ApphomeadminComponent } from './component/apphomeadmin/apphomeadmin.component';
import { AppprofilesComponent } from './component/appprofiles/appprofiles.component';
import { CardSearchComponent } from './component/card-search/card-search.component';
import { CreateModelComponent } from './component/create-model/create-model.component';
import { EmptyComponent } from './component/empty/empty.component';
import { LoginComponent } from './component/login/login.component';
import { NotEmptyComponent } from './component/not-empty/not-empty.component';
import { ProfileAdminComponent } from './component/profile-admin/profile-admin.component';
import { RegisterComponent } from './component/register/register.component';
import { SearchComponent } from './component/search/search.component';
import { StaticAdminComponent } from './component/static-admin/static-admin.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'home',component: ApphomeComponent},
  {path: 'profiles',component: AppprofilesComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'empty',component: EmptyComponent},
  {path: 'notempty',component: NotEmptyComponent},
  {path: 'appadmin',component: ApphomeadminComponent},
  {path: 'profiles-admin',component: ProfileAdminComponent},
  {path: 'search/:p1',component: SearchComponent},
  {path: 'search/:p1/',component: CardSearchComponent},
  {path: 'static',component:StaticAdminComponent},
  {path: 'create-model',component: CreateModelComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
