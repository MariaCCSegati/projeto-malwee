import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataSubGroup {
  id: number,
  description: string,
  fkGroup: string
}

@Component({
  selector: 'app-edit-subgroup',
  templateUrl: './edit-subgroup.component.html',
  styleUrls: ['./edit-subgroup.component.scss']
})
export class EditSubgroupComponent implements OnInit {

  description:string = '';
  subgroup:Array<any> = [];
  id: number | undefined;
  message: string = '';
  action: string = '';
  public group : Array<any> = [];
  selectedGroup : number = 0;
  grupo : string = "";
  groupDescription : string = "";

  constructor(public dialogRef: MatDialogRef<EditSubgroupComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataSubGroup, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.get();
  }

  openSnackBar() {
    this._snackBar.open(this.message, this.action);
  }

  async delete(){
    this.subgroup =  await this.httpService.patch(`subgroup/${this.data.id}`, {});
    this.message = 'Deletado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  async edit(description: any){
    this.data.description = description
    this.subgroup =  await this.httpService.put('subgroup/', {id: this.data.id, description: this.data.description, fkGroup:this.selectedGroup});
    console.log('edit')
    this.message = 'Editado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  async get(){
    this.group = await this.httpService.get('grupo');
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
