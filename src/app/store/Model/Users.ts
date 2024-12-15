export interface Users {
  id: number,
  name: string,
  email: string,
  role: string,
  status: string,
  joining_date: string,
  address: string
}

export interface UsersModel {
  list:Users[],
  userObj:Users,
  errormessage:string
}
