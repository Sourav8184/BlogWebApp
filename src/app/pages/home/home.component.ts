import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post.interface';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isFeaturePosts: Post[] = [];
  isLatestPosts: Post[] = [];

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.loadIsFeaturePosts();
    this.loadIsLatestPosts();
  }

  loadIsFeaturePosts(): void {
    this.postService.getIsFeaturePosts().subscribe((data) => {
      this.isFeaturePosts = data;
    });
  }

  loadIsLatestPosts(): void {
    this.postService.loadIsLatestPosts().subscribe((data) => {
      this.isLatestPosts = data;
    });
  }
}
