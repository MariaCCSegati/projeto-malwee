import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataUser {
  id: number,
  name: string,
  username: string, 
  password: string
}


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  name:string = '';
  username :string = '';
  password = '';
  cpassword = '';
  users:Array<any> = [];
  id: number | undefined;
  message: string = '';
  action: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataUser, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openSnackBar() {
    //this.message = 'Adicionado!'
    //this.action = 'Ok'
    this._snackBar.open(this.message, this.action);
  }

  async delete(){
    this.users =  await this.httpService.patch(`user/${this.data.id}`, {});
    this.message = 'Deletado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  async edit(password: any, cpassword: any){
    if(this.password.length < 6){
      this.message = 'A senha deve contar no mínimo 6 caracteres!'
      this.action = 'OK'
      this.openSnackBar();
    } else if(this.cpassword != this.password){
      this.message = 'Senhas diferentes!'
      this.action = 'OK'
      this.openSnackBar();
    } else{
      this.data.password = password
      this.users =  await this.httpService.put('user/', {id: this.data.id, password: this.data.password});
      this.message = 'Editado!'
      this.action = 'OK'
      this.openSnackBar();
      this.dialogRef.close();
    }
    
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
