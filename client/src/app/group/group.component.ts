import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { EditGroupComponent } from '../edit-group/edit-group.component';
export interface DialogDataGroup {
  group: string,
  id: number,
  description: string;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  description:string = '';
  group:Array<any> = []
  modal: string = '';
  //html:string = '';
  id: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
    this.get();
  }

  async get(){
    this.group = await this.httpService.get('grupo')
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {idGrupo : this.id, description: this.description}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.get();
    });
  }

  openDialog2(group: any, id: any, description: any){
    const dialogRef = this.dialog.open(EditGroupComponent, {
      width: '550px',
      data: {group: group, id : id, description: description}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.get();
    });
  }

  teste(){
    this.group.push({description : this.description})
    console.log(this.group)
  }

  async list(){
    this.group = await this.httpService.get('grupo');
    console.log(this.group)
  }

}
