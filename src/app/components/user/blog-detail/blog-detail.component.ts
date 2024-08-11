import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { FormBuilder } from '@angular/forms';
import { blogDto, getblogid } from '../../../model/blog.model';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { singleResponse } from '../../../model/response.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  constructor(private blogsv:BlogService ,private route: ActivatedRoute, private form:FormBuilder){}

  blog: getblogid = {} as getblogid;
  IdBlog:number = this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.IdBlog = + params['id']; 
      this.loadBlog(this.IdBlog);
      this.LoadBlogKhac();
    });
  }

  loadBlog(id:number){
    this.blogsv.GetBlogid(this.IdBlog).subscribe((res) =>{
      this.blog = res.data;
      console.log(this.blog);    
    },
  (error) => {console.log(error)})
  }

  blogs: blogDto[] = [];

  LoadBlogKhac() {
    this.blogsv.RandomBlog().subscribe(
      (data: singleResponse<blogDto[]>) => {
        this.blogs = data.data;
        console.log(this.blogs);
      }
    );
  }


}
