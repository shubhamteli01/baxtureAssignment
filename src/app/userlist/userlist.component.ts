import { ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../models/user';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceService } from '../shared/data-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  constructor(private service: UserServiceService,
    private cdr: ChangeDetectorRef, private dialog: MatDialog,
    private dataService: DataServiceService) { }

  users: any = [];
  datasourse = new MatTableDataSource()
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'actions'];

  ngOnInit(): void {
    this.refreshUserList();
  }

  refreshUserList(): void {
    this.service.getUsers().subscribe((res: any) => {
      this.dataService.data = res;
      this.showData();
    });
  }

  showData(): void {
    this.users = this.dataService.data;
    this.datasourse = new MatTableDataSource(this.users)
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((ele: any) => {
      return ele.id !== id
    })
    this.dataService.data = this.users;
    this.showData();

  }

  editUser(user: User): void {
    const selectedUser: User = user;
    this.dataService.setSelectedUser(selectedUser);
    const dialogRef = this.dialog.open(DialogueComponent, {
      width: '38%',
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(res)
      if (res.action === 'add') {
        const index = this.users.findIndex((u: any) => u.id === res.data.id);
        if (index !== -1) {
          this.users[index] = res.data;
          this.dataService.data = this.users;
          this.showData();
        }
      }

    });
  }
  addUser() {
    let newUser: User = {
      id: this.users.length + 1,
      name: '',
      email: '',
      address: {
        city: ''
      }
    };

    this.dataService.setSelectedUser(newUser);
    const dialogRef = this.dialog.open(DialogueComponent, {
      width: '38%',
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.action === 'add') {

        this.users.push(res.data)
        this.dataService.data = this.users;
        this.showData();
      }



    });
  }

}