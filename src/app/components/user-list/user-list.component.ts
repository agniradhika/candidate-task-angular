import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserDetailsComponent } from "../user-details/user-details.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor( private dialog: MatDialog) {
  }

  ngOnInit() {

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
