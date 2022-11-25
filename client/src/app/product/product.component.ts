import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
export interface DialogDataProduct {
  id: number,
  description: string,
  preco: number;
  fkGroup : number;
  fkSubgroup: number;
  fkCollection: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  description:string = '';
  preco:number | undefined;
  produtos:Array<any> = []
  modal: string = '';
  id: any;
  fkGroup : number= 0;
  fkSubgroup: number= 0;
  fkCollection: number= 0;
  
  constructor(
    private http : HttpClient, private httpService : HttpService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.list();
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalProductComponent, {
      width: '550px',
      data: {id : this.id, description : this.description, preco : this.preco}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.list();
    });
  }

  openDialog2(produtos: any, id: any, description: any, preco: any){
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '550px',
      data: {produto: produtos, id: id, description: description, preco: preco}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.list();
    });
  }

  teste(){
    this.produtos.push({description : this.description, preco : this.preco})
    console.log(this.produtos)
  }

  async list(){
    this.produtos = await this.httpService.get('product');
    console.log(this.produtos)
  }

}
