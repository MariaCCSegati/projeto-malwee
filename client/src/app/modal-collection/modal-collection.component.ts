import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-collection',
  templateUrl: './modal-collection.component.html',
  styleUrls: ['./modal-collection.component.scss']
})
export class ModalCollectionComponent implements OnInit {

  description:string = '';
  collection:Array<any> = [];
  id: number | undefined;
  message: string = '';
  action: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalCollectionComponent>, private http : HttpClient, private httpService : HttpService, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this.message = 'Adicionado!'
    this.action = 'Ok'
    this._snackBar.open(this.message, this.action);
  }

  async insert(){
    this.collection =  await this.httpService.post('collection', {description : this.description});
    console.log(this.description);
    this.openSnackBar();
    this.cancel();
  }

}
