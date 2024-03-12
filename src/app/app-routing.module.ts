import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './Auth/login/login.component';
// import { ShirtComponent } from './shirt/shirt.component';
// import { PantsComponent } from './pants/pants.component';
// import { DressComponent } from './dress/dress.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LaptopListComponent } from './laptop-list/laptop-list.component';
import { SmartPhonesComponent } from './smart-phones/smart-phones.component';
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path:'cart',component: CartComponent, title: 'Cart Details'},
  { path: 'product-details/:id',component: ProductDetailsComponent, title: 'Product Details' },
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'signup', component: RegisterComponent, title: 'Sign Up'},
  {path: 'laptops', component:LaptopListComponent, title: 'Laptops'},
  {path: 'smartphones', component:SmartPhonesComponent, title: 'Smart Phones'},
  // { path: 'shirt/:id', component: ShirtComponent },
  // { path: 'pants/:id', component: PantsComponent },
  // { path: 'dress/:id', component: DressComponent },

  { path: 'products/:category', component: ProductListComponent },
  { path: 'list', component: ProductListComponent, title: 'Product List' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
