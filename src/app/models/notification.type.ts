import {EventEmitter} from '@angular/core';

export interface Notification {
  id?: string
  type: string
  addAction: string
  defaultAction: string
  icon: string
  title?: string
  description?: string
  state?: string
  createdAt?: Date
  theClass?: string
  click?: EventEmitter<{}>;
}
