import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from '../models/subscription';
import { SubscriptionService } from '../services/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent {
  submitted = false;
  constructor(
    private readonly subService: SubscriptionService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;

      const subscriptionData: Subscription = {
        name: form.value.name,
        email: form.value.email,
      };

      this.subService
        .addSubscription(subscriptionData)
        .then(() => {
          this.toastr.success(this.translate.instant('SUCCESS'));

          form.reset();
        })
        .catch(() => {
          this.toastr.error(this.translate.instant('ERROR'));
        });
    }
  }
}
