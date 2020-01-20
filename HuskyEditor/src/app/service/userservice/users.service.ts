import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {User} from '../../models/users';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})

// Stores User Login Account Details and setting up connection from backend
export class UsersService {
  requestUrl:string='http://localhost:3301';

  constructor(private http:HttpClient){}
  Login(account:string,password:string):Observable<any>
  {
    return this.http.get<User>(this.requestUrl+'/authentication?account='+account+'&password='+password);
  }
  Register(user:User):Observable<any>
  {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
     })
   };
   console.log(user)
   let body=JSON.stringify(user);
   console.log(body);


   return this.http.post<User>(this.requestUrl+'/registration?',body,httpOptions);
  }
}
