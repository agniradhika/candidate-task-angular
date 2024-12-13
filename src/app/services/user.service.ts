import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Users } from "../store/Model/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = "http://localhost:3000/users"
  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<Users[]>(this.baseURL);
  }
  getUserById(id: number) {
    return this.httpClient.get<Users>(this.baseURL+'/'+id);
  }
  editUserbyId(data: Users) {
    return this.httpClient.put(this.baseURL+'/'+data.id, data);
  }
}
