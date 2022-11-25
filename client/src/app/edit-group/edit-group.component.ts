import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataGroup {
  id: number,
  description: string;
}

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {

  description:string = '';
  group:Array<any> = [];
  id: number | undefined;
  message: string = '';
  action: string = '';

  constructor(public dialogRef: MatDialogRef<EditGroupComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataGroup, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar() {
    //this.message = 'Adicionado!'
    //this.action = 'Ok'
    this._snackBar.open(this.message, this.action);
  }

  async delete(){
    this.group =  await this.httpService.patch(`grupo/${this.data.id}`, {});
    this.message = 'Deletado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
    //alert('deletado!')
  }

  async edit(description: any){
    this.data.description = description
    this.group =  await this.httpService.put('grupo/', {id: this.data.id, description: this.data.description});
    console.log('edit')
    this.message = 'Editado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
    //alert('editado!')
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
