import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from '../models/subscription';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private readonly subService: AngularFirestore) {}

  // Check if email already exists
  async emailExists(email: string): Promise<boolean> {
    const snapshot = await firstValueFrom(
      this.subService
        .collection('subscriptions', (ref) => ref.where('email', '==', email))
        .get(),
    );

    return !snapshot.empty; // true → exists
  }

  addSubscription(data: Subscription) {
    return this.subService.collection('subscriptions').add({
      ...data,
      createdAt: new Date(),
    });
  }
}
