import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ShirtComponent } from './shirt/shirt.component';
import { PantsComponent } from './pants/pants.component';
import { DressComponent } from './dress/dress.component';
import { ProductListComponent } from './product-list/product-list.component';
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path:'cart/:id',component: CartComponent, title: 'Cart Details'},
  { path: 'product-details/:id',component: ProductDetailsComponent, title: 'Product Details' },
  // {path: 'login', component: LoginComponent, title: 'Login'},
  { path: 'shirt/:id', component: ShirtComponent },
  { path: 'pants/:id', component: PantsComponent },
  { path: 'dress/:id', component: DressComponent },
  { path: 'list', component: ProductListComponent, title: 'Product List' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
