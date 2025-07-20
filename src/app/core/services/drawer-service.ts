import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private isOpen = signal(false)

  readonly isDrawerOpen = this.isOpen.asReadonly()

  toggle(): void {
    this.isOpen.set(!this.isOpen())
  }

  open(): void {
    this.isOpen.set(true)
  }
  close(): void {
    this.isOpen.set(false)
  }
}
