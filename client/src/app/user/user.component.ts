import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
export interface DialogDataUser {
  id: number,
  name: string,
  username: string, 
  password: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users : Array<any> = [];
  user : string = "";
  name : string = "";
  username : string = "";
  password : string = "";
  cpassword : string = "";
  id: number | undefined;
  constructor(private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get()
  }

  async get(){
    this.users = await this.httpService.get('user')
  }


  openDialog(): void {
    const ref = this.dialog.open(ModalUserComponent, {
      width: '500px',
      data: {id : this.id, nome : this.name, username : this.username, password : this.password}
    });
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  openDialog2(users: any, id: any, name: any, username: any, password: any): void {
    const ref = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: {users: users, id : id, name : name, username : username, password : password}
    });
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }

  teste(){
    this.users.push({name : this.name, username : this.username,
      password : this.password, cpassword : this.cpassword})
    console.log(this.users)
  }

  async list(){
    this.users = await this.httpService.get('user');
    console.log(this.users)
  }

}
