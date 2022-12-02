import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/services/http.service';
export interface DialogDataProduct {
  id: number,
  subgroup: string,
  description: string,
  fkGroup : number;
  fkSubGroup: number;
  fkCollection: number;
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {

  description:string = '';
  preco:number | undefined;
  produtos:Array<any> = []
  id: any;
  public group : Array<any> = [];
  public subgroup : Array<any> = [];
  public collection : Array<any> = [];
  selectedGroup : number = 0;
  selectedGroup2 : number = 0;
  selectedGroup3 : number = 0;
  grupo : string = "";
  subgrupo : string = "";
  colecao : string = "";
  message: string = '';
  action: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalProductComponent>, private http : HttpClient, private httpService : HttpService, private _snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.get();
    await this.getSubgroup();
    await this.getCollection();
  }

  openSnackBar() {
    this.message = 'Adicionado!'
    this.action = 'Ok'
    this._snackBar.open(this.message, this.action);
  }

  async get(){
    this.group = await this.httpService.get('grupo');
  }

  async getSubgroup(){
    this.subgroup = await this.httpService.get('subgroup');
  }
  
  async getCollection(){
    this.collection = await this.httpService.get('collection');
  }

  cancel(): void {
    this.dialogRef.close();

  }

  async insert(){
    this.produtos =  await this.httpService.post('product', {description : this.description, preco : this.preco, fkGroup: this.selectedGroup, fkSubGroup: this.selectedGroup2, fkCollection: this.selectedGroup3});
    console.log(this.description);
    this.openSnackBar();
    this.cancel();
  }

}
