import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { Category } from '../interface/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: AngularFirestore) {}

  getCategories(): Observable<Category[]> {
    return this.firestore
      .collection<Category>('categories')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((doc) => {
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data() as Category;
            // Convert Firestore Timestamp → JavaScript Date
            if (data.createdAt instanceof Timestamp) {
              data.createdAt = data.createdAt.toDate();
            }
            return { id, ...data };
          }),
        ),
      );
  }
}
