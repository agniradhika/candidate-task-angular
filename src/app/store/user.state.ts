import { UsersModel } from "./Model/Users";

export const UserState : UsersModel = {
  list:[],
  errormessage:'',
  userObj:{
    id: 0,
    name: "",
    email: "",
    role: "",
    status: "",
    address: "",
    joining_date: "",
  },
  filteredUsers: [],
  filter: {
    name: "",
    role: "",
    status: ""
  }
}
