import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
 
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GetrideComponent } from './getride/getride.component';
@NgModule({
  
  imports: [
    BrowserModule,
    AgmDirectionModule,  
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSIFuXPQXel1splGkx5ElXoU1bL60Jn-I',
      libraries: ['places','geometry']      
    })
  ],
  declarations: [AppComponent, DashboardComponent, RegisterComponent, LoginComponent, GetrideComponent],
  bootstrap: [AppComponent],
  providers: [GoogleMapsAPIWrapper]
  
})

export class AppModule {}