import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalCollectionComponent } from '../modal-collection/modal-collection.component';
import { EditCollectionComponent } from '../edit-collection/edit-collection.component';
export interface DialogDataCollection {
  id: number,
  description: string;
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  description:string = '';
  collection:Array<any> = []
  modal: string = '';
  id: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
    this.modal = 'false';
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalCollectionComponent, {
      width: '550px',
      data: {id : this.id, description: this.description}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.list();
    });
  }

  openDialog2(collection: any, id: any, description: any){
    const dialogRef = this.dialog.open(EditCollectionComponent, {
      width: '550px',
      data: {collection: collection, id : id, description: description}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.list();
    });
  }

  teste(){
    this.collection.push({description : this.description})
    console.log(this.collection)
  }

  async list(){
    this.collection = await this.httpService.get('collection');
    console.log(this.collection)
  }
}
