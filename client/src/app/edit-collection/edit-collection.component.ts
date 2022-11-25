import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataCollection {
  id: number,
  description: string;
}

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {

  description:string = '';
  collection:Array<any> = [];
  id: number | undefined;
  message: string = '';
  action: string = '';

  constructor(public dialogRef: MatDialogRef<EditCollectionComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataCollection, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar() {
    //this.message = 'Adicionado!'
    //this.action = 'Ok'
    this._snackBar.open(this.message, this.action);
  }

  async delete(){
    this.collection =  await this.httpService.patch(`collection/${this.data.id}`, {});
    //alert('deletado!')
    this.message = 'Deletado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  async edit(description: any){
    this.data.description = description
    this.collection =  await this.httpService.put('collection/', {id: this.data.id, description: this.data.description});
    //alert('editado!')
    this.message = 'Editado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
