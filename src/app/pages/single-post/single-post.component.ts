import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interface/post.interface';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  post!: Post;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadOnePost(id);
      }
    });
  }

  loadOnePost(id: string): void {
    this.postService.loadSinglePost(id).subscribe((post) => {
      this.post = post;
    });
  }
}
