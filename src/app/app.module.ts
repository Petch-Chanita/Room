import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppfooterComponent } from './component/appfooter/appfooter.component';
import { AppheaderComponent } from './component/appheader/appheader.component';
import { AppmenuComponent } from './component/appmenu/appmenu.component';
import { ApphomeComponent } from './component/apphome/apphome.component';
import { AppprofilesComponent } from './component/appprofiles/appprofiles.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './component/card/card.component';
import { EmptyComponent } from './component/empty/empty.component';
import { NotEmptyComponent } from './component/not-empty/not-empty.component';
import { ApphomeadminComponent } from './component/apphomeadmin/apphomeadmin.component';
import { TableComponent } from './component/table/table.component';
import { ProfileAdminComponent } from './component/profile-admin/profile-admin.component';
import { MenuadminComponent } from './component/menuadmin/menuadmin.component';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import { SearchComponent } from './component/search/search.component';
import { TextSearchComponent } from './component/text-search/text-search.component';
import { CardSearchComponent } from './component/card-search/card-search.component';
import { StaticAdminComponent } from './component/static-admin/static-admin.component';
import { CreateModelComponent } from './component/create-model/create-model.component';


@NgModule({
  declarations: [
    AppComponent,
    AppfooterComponent,
    AppheaderComponent,
    AppmenuComponent,
    ApphomeComponent,
    AppprofilesComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    EmptyComponent,
    NotEmptyComponent,
    ApphomeadminComponent,
    TableComponent,
    ProfileAdminComponent,
    MenuadminComponent,
    SearchComponent,
    TextSearchComponent,
    CardSearchComponent,
    StaticAdminComponent,
    CreateModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ConfirmDialogModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
