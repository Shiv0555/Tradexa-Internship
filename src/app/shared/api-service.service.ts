import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  baseUrl : string = "https://jsonplaceholder.typicode.com/posts";

  postData(data:any){
    return this.http.post<any>(this.baseUrl, data);
  }

  getAllData(){
    return this.http.get<any>(this.baseUrl);
  }

  deleteData(id:any){
    return this.http.delete<any>(this.baseUrl+ id);
  }

  updateData(data:any, id:number){
    return this.http.put<any>(this.baseUrl+id, data);
  }

}
