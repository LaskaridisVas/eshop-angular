import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path:"", redirectTo:'login',pathMatch:'full'},
    {path:"login", component:LoginComponent},
    {path:"main", component:MainComponent},
    {path:"registration", component:RegisterComponent},
    {path:"category/:id", component:CategoryComponent},
    {path:"product/:id", component:ProductComponent},
    {path:"cart", component:CartComponent},
    {path:"user", component:UserProfileComponent},
    {path:"searchResults/:id", component:SearchResultsComponent},
    {path:"**", component:NotFoundComponent},
];
