import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShirtComponent } from './shirt/shirt.component';
import { PantsComponent } from './pants/pants.component';
import { DressComponent } from './dress/dress.component';

import { ProductListComponent } from './product-list/product-list.component';
import { StarComponent } from './product-list/star/star.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
//
import { NgxPaginationModule } from 'ngx-pagination';

//
import { HttpClientModule} from '@angular/common/http';
import { StarRatingComponent } from './product-details/star-rating/star-rating.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProductsComponent,
    CartComponent,
    ShirtComponent,
    PantsComponent,
    DressComponent,
    ProductListComponent,
    StarComponent,
    LoginComponent,
    RegisterComponent,
    StarRatingComponent,
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule

    
  ],
 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
