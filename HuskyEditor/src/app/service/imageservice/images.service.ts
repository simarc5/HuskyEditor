import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Images} from '../../models/images';
//  injector is responsible for creating service instances and injecting them into classes
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  requestUrl:string='http://localhost:3301';
 constructor(private http:HttpClient){}
 RetrieveAllImage()
 {
  return this.http.get<Images>(this.requestUrl+'/Imagebank');
 }
 UploadNewImage(image:Images)
 {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  let body=JSON.stringify(image);
  return this.http.post<Images>(this.requestUrl+"/Imagebank/Save?",body,httpOptions);
 }
}
