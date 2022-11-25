import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
export interface DialogDataProduct {
  id: number,
  description: string,
  preco: number;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  description:string = '';
  produtos:Array<any> = [];
  id: number | undefined;
  preco: number | undefined;

  constructor(public dialogRef: MatDialogRef<EditProductComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataProduct) { }

  ngOnInit(): void {
  }

  async delete(){
    this.produtos =  await this.httpService.patch(`product/${this.data.id}`, {});
    alert('deletado!')
  }

  async edit(description: any, preco: any){
    this.data.description = description;
    this.data.preco = preco;
    this.produtos =  await this.httpService.put('product/', {id: this.data.id, description: this.data.description, preco: this.preco});
    alert('editado!')
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
