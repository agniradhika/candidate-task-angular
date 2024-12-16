import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { Store } from "@ngrx/store";
import { UserFilters, Users } from "../../store/Model/Users";
import { filteredUsers, getAllUsersList } from "../../store/selectors/user.selectors";
import { filterUsers, filterUsersSuccess, viewAllUsers, viewUserById } from "../../store/actions/user.actions";
import { Observable } from "rxjs";
import { UserState } from "../../store/user.state";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  allUsers$!: Observable<Partial<Users>[]>;
  displayedColumns: string[] = ["id", "name", "email", "role", "status", "action"];
  filterObj: Partial<UserFilters> = UserState.filter;
  constructor( private dialog: MatDialog, private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(viewAllUsers())
    this.allUsers$ =  this.store.select(getAllUsersList);
  }

  openForm(id: number, title: string) {
    this.dialog.open(UserDetailsComponent,{
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      data: {
        id: id,
        title: title
      }
    })
  }

  openUserForm(id: number, title: string) {
    this.store.dispatch(viewUserById({id: id}))
    this.openForm(id, title);
  }

  applyFilter(event: Event, filter: string) {
    this.allUsers$ = this.store.select(filteredUsers);
    const filterString = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterObj = { ... this.filterObj,
      ...{[filter]: filterString},
    };
    console.log("filterObj", this.filterObj)
    this.store.dispatch(filterUsers({ filter: this.filterObj }));
  }
}
