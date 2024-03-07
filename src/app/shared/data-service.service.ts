import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  user: User = {
    id: 0,
    name: '',
    email: '',
    address: { city: '' }
  }
  data: User[] = [];
  private selectedUserSubject = new BehaviorSubject<User>(this.user);
  selectedUser$ = this.selectedUserSubject.asObservable();

  setSelectedUser(user: User): void {
    this.selectedUserSubject.next(user);
  }


  clearSelectedUser(): void {
    this.selectedUserSubject.next(this.user);
  }
}
