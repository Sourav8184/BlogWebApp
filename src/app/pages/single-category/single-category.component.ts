import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interface/post.interface';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit {
  categoryPost: Post[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadCategoryPost(id);
      }
    });
  }

  loadCategoryPost(id: string): void {
    this.postService.loadCategoryPosts(id).subscribe((data) => {
      this.categoryPost = data;
    });
  }
}
