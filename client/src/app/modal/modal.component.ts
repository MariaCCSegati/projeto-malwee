import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  description:string = '';
  group:Array<any> = [];
  id: number | undefined;
  html: string = '';
  message: string = '';
  action: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>, private http : HttpClient, private httpService : HttpService, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.html = 'false';
  }

  openSnackBar() {
    this.message = 'Adicionado!'
    this.action = 'Ok';
    this._snackBar.open(this.message, this.action);
  }

  public htmlAdd(){
    this.html = 'true';
}

  cancel(): void {
    this.dialogRef.close();
  }

  async insert(){
    this.group =  await this.httpService.post('grupo', {description : this.description});
    console.log(this.description);
    this.openSnackBar();
    this.cancel();
    //alert('adicionado')
  }

}
