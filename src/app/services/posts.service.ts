import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';
import { Post } from '../interface/post.interface';

// This service handles post creation and image uploads
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly firestore: AngularFirestore) {}

  loadIsFeaturePosts(): Observable<Post[]> {
    return this.firestore
      .collection<Post>('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(3),
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((doc) => {
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data() as Post;
            if (data.createdAt instanceof Timestamp) {
              data.createdAt = data.createdAt.toDate();
            }
            return { id, ...data };
          }),
        ),
      );
  }

  loadIsLatestPosts(): Observable<Post[]> {
    return this.firestore
      .collection<Post>('posts', (ref) => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((doc) => {
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data() as Post;
            if (data.createdAt instanceof Timestamp) {
              data.createdAt = data.createdAt.toDate();
            }
            return { id, ...data };
          }),
        ),
      );
  }

  loadCategoryPosts(categoryId: string): Observable<Post[]> {
    return this.firestore
      .collection<Post>('posts', (ref) =>
        ref.where('category.id', '==', categoryId),
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((doc) => {
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data() as Post;
            if (data.createdAt instanceof Timestamp) {
              data.createdAt = data.createdAt.toDate();
            }
            return { id, ...data };
          }),
        ),
      );
  }

  loadSinglePost(postId: string): Observable<Post> {
    return this.firestore
      .collection<Post>('posts')
      .doc(postId)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          const id = doc.payload.id;
          const data = doc.payload.data() as Post;

          if (data.createdAt instanceof Timestamp) {
            data.createdAt = data.createdAt.toDate();
          }

          return { id, ...data };
        }),
      );
  }

  loadSimilarPosts(categoryId: string): Observable<Post[]> {
    return this.firestore
      .collection<Post>('posts', (ref) =>
        ref.where('category.id', '==', categoryId).limit(3),
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((doc) => {
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data() as Post;
            if (data.createdAt instanceof Timestamp) {
              data.createdAt = data.createdAt.toDate();
            }
            return { id, ...data };
          }),
        ),
      );
  }
}
