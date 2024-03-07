import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../shared/data-service.service';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogueComponent>,
    private formBuilder: FormBuilder, private dataService: DataServiceService) { }
  userForm: FormGroup | any;
  selectedUser!: User;
  ngOnInit(): void {

    this.dataService.selectedUser$.subscribe((user: User) => {
      console.log(user)

      if (user) {
        this.userForm = this.formBuilder.group({
          id: [user.id],
          name: [user.name, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          address: this.formBuilder.group({
            city: [user.address.city, Validators.required]
          })
        });
      }
    });


  }
  onSave(): void {
    console.log(this.userForm)
    if (this.userForm?.valid && !this.userForm.value.cancelAction) {
      this.dialogRef.close({ action: 'add', data: this.userForm.value });
    } else {
      alert('Please provide correct inputs; validations are applied.')
    }
  }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel' });
  }

}
