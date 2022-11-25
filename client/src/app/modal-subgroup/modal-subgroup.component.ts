
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/services/http.service';


export interface DialogDataSubGroup {
  id: number,
  subgroup: string,
  description: string,
  fk : number;
}

@Component({
  selector: 'app-modal-subgroup',
  templateUrl: './modal-subgroup.component.html',
  styleUrls: ['./modal-subgroup.component.scss']
})
export class ModalSubgroupComponent implements OnInit {

  description:string = '';
  subgroup:Array<any> = [];
  id: number | undefined;
  public group : Array<any> = [];
  selectedGroup : number = 0;
  grupo : string = "";
  groupDescription : string = "";
  message: string = '';
  action: string = '';

  constructor(public dialogRef: MatDialogRef<ModalSubgroupComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataSubGroup, private _snackBar: MatSnackBar) { }

  ngOnInit() : void{
    this.get()
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
    this.subgroup =  await this.httpService.post('subgroup', {description : this.description, fkGroup : this.selectedGroup});
    console.log(this.description);
    this.openSnackBar();
    this.cancel();
  }

  async get(){
    this.group = await this.httpService.get('grupo');
  }

  async getValue(){
    this.data.description = this.groupDescription;
  }

}
