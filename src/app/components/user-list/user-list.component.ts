import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { Store } from "@ngrx/store";
import { Users } from "../../store/Model/Users";
import { getAllUsersList } from "../../store/selectors/user.selectors";
import { viewAllUsers } from "../../store/actions/user.actions";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  allUsers: Users[] = [];
  displayedColums: string[] = ["id", "name", "email", "role", "address", "status", "joining_date"]
  constructor( private dialog: MatDialog, private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(viewAllUsers())
    this.store.select(getAllUsersList)
        .subscribe((data) => {
          this.allUsers = data;
          //console.log("data",this.allUsers)
        })
  }

  viewUser() {
    this.openForm(23,"View User")
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
}
