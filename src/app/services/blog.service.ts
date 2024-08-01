import { BlogComponent } from './../components/user/blog/blog.component';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { singleResponse } from "../model/response.model";
import { environment } from "../environment/environment.bassic";
import { blogDto } from '../model/blog.model';



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getData(page: number): Observable<singleResponse<blogDto[]>> {
    return this.http.get<singleResponse<blogDto[]>>(
      `${environment.api}/Blog/getall-blog-${page}`
    );
  }
  countblog(name:FormData):Observable<singleResponse<number>>{
    return this.http.post<singleResponse<number>>(`${environment.api}/Blog/getNumber-blog`,name);
  }
}
