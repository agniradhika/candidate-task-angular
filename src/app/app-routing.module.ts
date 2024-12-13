import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";

const routes: Routes = [
  { path: '', redirectTo: "/users", pathMatch: "full" },
  { path: 'users', component: UserListComponent },
  { path: ':id/view', component: UserDetailsComponent },
  { path: ':id/edit', component: UserDetailsComponent },
  { path: '**', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
