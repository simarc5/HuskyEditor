
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog'
import { AngularCropperjsModule } from 'angular-cropperjs';
import {MatSliderModule} from '@angular/material/slider'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PreviewComponent } from './preview/preview.component';
import { EditComponent } from './edit/edit.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PoolComponent } from './pool/pool.component';
import { Routes, RouterModule} from "@angular/router"
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import {PreviewService} from './preview.service';
import {PreviewService} from './service/previewservice/preview.service'
// import {ImageEditingDirective} from './image-editing.directive';
import {ImageEditingDirective} from '../app/service/imageservice/image-editing.directive';
// import {WelcomeComponent} from './welcome/welcome.component';
import {HomepageComponent} from './homepage/homepage.component';
import { ReEditComponent } from './re-edit/re-edit.component';

//  Route configuration to configure to different routes
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pool', component: PoolComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'edit', component: EditComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: '', component: HomepageComponent},
  { path: 'reEdit', component: ReEditComponent}
];

//  Declaring different NgModules
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PreviewComponent,
    EditComponent,
    ConfirmComponent,
    LoginComponent,
    RegisterComponent,
    PoolComponent,
    HomepageComponent,
    ImageEditingDirective,
    ReEditComponent,
  ],
  imports: [
    BrowserModule,
    AngularCropperjsModule,
    MatSliderModule,
    MatDialogModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [PreviewService],
  bootstrap: [AppComponent]
})

// Exporting the class
export class AppModule { }
