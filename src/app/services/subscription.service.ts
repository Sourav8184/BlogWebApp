import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private readonly subService: AngularFirestore) {}

  addSubscription(data: Subscription) {
    return this.subService.collection('subscriptions').add({
      ...data,
      createdAt: new Date(),
    });
  }
}
