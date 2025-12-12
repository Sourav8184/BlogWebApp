import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post.interface';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allFeaturePosts: Post[] = [];

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((data) => {
      this.allFeaturePosts = data;
    });
  }
}
