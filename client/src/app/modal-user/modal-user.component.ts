import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/services/http.service';
export interface DialogDataUser {
  id: number,
  name: string,
  username: string, 
  password: string
}

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {
  hide = true;
  name:string = '';
  username :string = '';
  password = '';
  cpassword = '';
  users:Array<any> = [];
  id: number | undefined;
  message: string = '';
  action: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalUserComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataUser, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.open(this.message, this.action);
  }

  async insert(){
    if(this.password.length < 6){
      this.message = 'Senha precisa ser maior que 6 caracteres!'
      this.action = 'Ok'
      this.openSnackBar();
    } else if(this.cpassword != this.password){
      this.message = 'Senhas diferentes!'
      this.action = 'Ok'
      this.openSnackBar();
    } else {
      this.users =  await this.httpService.post('user', {name : this.name, username : this.username,
        password : this.password, cpassword : this.cpassword});
      console.log(this.name);
      this.message = 'Adicionado!'
       this.action = 'Ok'
      this.openSnackBar();
      this.cancel();
    }
    
  }

}
