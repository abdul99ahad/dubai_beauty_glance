import { Subscription } from "rxjs";

export abstract class BaseComponent {
  private readonly componentSubscriptions: Array<Subscription> = [];

  protected addSubscriptions(...subscription: Array<Subscription>): void {
    this.componentSubscriptions.push(...subscription);
  }

  protected flushSubscriptions(): void {
    this.componentSubscriptions.forEach((subscription: Subscription): void => {
      subscription.unsubscribe();
    });
  }
}
