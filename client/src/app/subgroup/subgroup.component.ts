import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalSubgroupComponent } from '../modal-subgroup/modal-subgroup.component';
import { EditSubgroupComponent } from '../edit-subgroup/edit-subgroup.component';
export interface DialogDataSubGroup {
  id: number,
  description: string,
  fk : number;
}

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss']
})
export class SubgroupComponent implements OnInit {

  description:string = '';
  subgroup:Array<any> = []
  fk: number = 0;
  modal: string = '';
  id: any;
  public group : Array<any> = [];
  grupo : string = "";

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
    this.modal = 'false';
  }


  async get(){
    this.group = await this.httpService.get('grupo');
  }
  
  openDialog(){
    const dialogRef = this.dialog.open(ModalSubgroupComponent, {
      width: '500px',
      data: {idGrupo : this.id, description: this.description}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.list();
    });
  }

  openDialog2(subgroup: any, id: any, description: any){
    const dialogRef = this.dialog.open(EditSubgroupComponent, {
      width: '400px',
      data: {subgroup: subgroup, id: id, description: description}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.list();
    });
  }

  teste(){
    this.subgroup.push({description : this.description})
    console.log(this.subgroup)
  }

  async list(){
    this.subgroup = await this.httpService.get('subgroup');
    console.log(this.subgroup)
  }

}


