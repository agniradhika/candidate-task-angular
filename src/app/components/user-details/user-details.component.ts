import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { viewUserById } from "../../store/selectors/user.selectors";
import { editUserById } from "../../store/actions/user.actions";
import { Users } from "../../store/Model/Users";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  title: String = "";
  id: number = 0;
  isEditModeOn: Boolean = false;
  previousValue: any;

  constructor(public formBuilder: FormBuilder,
              private ref: MatDialogRef<UserDetailsComponent>,
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
        this.previousValue= { ...this.userForm.value };
        this.userForm.disable();
      });
  }

  userForm = this.formBuilder.group({
    "id": this.formBuilder.control(0, Validators.required),
    "name": this.formBuilder.control('', Validators.required),
    "email": this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    "role": this.formBuilder.control('Engineer'),
    "status": this.formBuilder.control(''),
    "joining_date": this.formBuilder.control('', Validators.required),
    "address": this.formBuilder.control('', Validators.required),
  });

  closeForm() {
    this.ref.close();
  }

  editModeToggle() {
    this.isEditModeOn = !this.isEditModeOn;
    if(this.isEditModeOn == true) {
      this.userForm.enable();
    } else {
      this.userForm.disable()
    }
  }

  editUserById(id: number) {
    //check if data is changed
    if(this.isFormUpdated() && this.userForm.valid) {
      //set form values in users format
      const users: Users = {
        id: this.userForm.value.id as number,
        name: this.userForm.value.name as string,
        email: this.userForm.value.email as string,
        role: this.userForm.value.role as string,
        address: this.userForm.value.address as string,
        joining_date: this.userForm.value.joining_date as string,
        status: this.userForm.value.status as string
      }
      //send api request
      this.store.dispatch(editUserById({obj: users}))
      this.closeForm();
    }
  }

  isFormUpdated(): boolean {
    return JSON.stringify(this.userForm.value) !== JSON.stringify(this.previousValue);
  }

}
