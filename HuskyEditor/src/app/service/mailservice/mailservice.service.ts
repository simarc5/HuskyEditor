import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Mails } from '../../models/mails';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailserviceService {
  requestUrl:string='http://localhost:3301';
  mainls:Mails=new Mails();
  constructor(private http:HttpClient){}

  // Observable are just that — things you wish to observe and take action on. Angular uses the Observer pattern which simply means — Observable objects are registered
  SendMail(mails):Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    let body=JSON.stringify(mails);
    console.log(body);


    return this.http.post<Mails>(this.requestUrl+'/sendmail?',body,httpOptions);
  }
}
