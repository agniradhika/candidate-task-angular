import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserFilters, Users } from "../store/Model/Users";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = "http://localhost:3000/users";
  public allUsers$!: Observable<Partial<Users>[]>;
  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<Users[]>(this.baseURL);
  }
  getUserById(id: number) {
    return this.httpClient.get<Users>(this.baseURL+'/'+id);
  }
  editUserById(data: Users) {
    return this.httpClient.put(this.baseURL+'/'+data.id, data);
  }

  filterUsers(userArray: Users[], filter: Partial<UserFilters>) {
    return userArray.filter(user => {
      const matchesName = filter["name"] ? user.name?.toLowerCase().includes(filter["name"].toLowerCase()) : true;
      const matchesRole = filter["role"] ? user.role?.toLowerCase().includes(filter["role"].toLowerCase()) : true;
      const matchesStatus = filter["status"] ? user.status?.toLowerCase().includes(filter["status"].toLowerCase()) : true;

      return matchesName && matchesStatus && matchesRole;
    });
  }
}
