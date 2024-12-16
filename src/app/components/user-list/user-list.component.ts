import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { Store } from "@ngrx/store";
import { UserFilters, Users } from "../../store/Model/Users";
import { filteredUsers, getAllUsersList } from "../../store/selectors/user.selectors";
import { filterUsers, viewAllUsers, viewUserById } from "../../store/actions/user.actions";
import { UserState } from "../../store/user.state";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "email", "role", "status", "action"];
  filterObj: Partial<UserFilters> = UserState.filter;
    columns = [
      {
        columnDef: 'id',
        title: 'ID',
        cell: (row: any) => row.id,
        filterable: false,
      },
      {
        columnDef: 'name',
        title: 'Name',
        cell: (row: any) => row.name,
        filterable: true,
      },
      {
        columnDef: 'email',
        title: 'Email',
        cell: (row: any) => row.email,
        filterable: false,
      },
      {
        columnDef: 'role',
        title: 'Role',
        cell: (row: any) => row.role,
        filterable: true,
      },
      {
        columnDef: 'status',
        title: 'Status',
        cell: (row: any) => row.status,
        filterable: true,
      },
      {
        columnDef: 'action',
        title: 'Action',
        cell: (row: any) => ``,
        filterable: false,
      },
    ];

  constructor( private dialog: MatDialog, private store: Store, public userService: UserService) {
  }

  ngOnInit() {
    this.store.dispatch(viewAllUsers())
    this.userService.allUsers$ =  this.store.select(getAllUsersList);
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
    this.userService.allUsers$ = this.store.select(filteredUsers);
    const filterString = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterObj = { ... this.filterObj,
      ...{[filter]: filterString},
    };
    this.store.dispatch(filterUsers({ filter: this.filterObj }));
  }
}
