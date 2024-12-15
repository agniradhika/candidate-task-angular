import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { viewUserById } from "../../store/selectors/user.selectors";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  title: String = "";
  id: number;
  editMode: Boolean = false;
  constructor(public formBuilder: FormBuilder, private ref: MatDialogRef<UserDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {
    this.title = this.data.title;
    this.id = this.data.id;
  }

  ngOnInit() {
      //view mode
      this.store.select(viewUserById).
      subscribe((data)=>{
        this.userForm.setValue({
          id: data.id, name: data.name, email: data.email, role: data.role,
          address: data.address, joining_date: data.joining_date, status: data.status
        });
        this.userForm.disable();
      });
  }
  userForm = this.formBuilder.group({
    "id": this.formBuilder.control(0),
    "name": this.formBuilder.control('', Validators.required),
    "email": this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    "role": this.formBuilder.control('Engineer'),
    "status": this.formBuilder.control(""),
    "joining_date": this.formBuilder.control('', Validators.required),
    "address": this.formBuilder.control('', Validators.required),
  });

  closeForm() {
    this.ref.close();
  }
}
