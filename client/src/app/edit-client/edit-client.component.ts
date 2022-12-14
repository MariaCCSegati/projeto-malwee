import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throws } from 'assert';
import { AnyTxtRecord } from 'dns';
import { HttpService } from 'src/services/http.service';
import { threadId } from 'worker_threads';
import { CepServiceService } from '../cep-service.service';
import { EditAddressComponent } from '../edit-address/edit-address.component';
export interface DialogDataClient{
  logradouro: string;
  clientes : Array<any>;
  address: any[];
  id: number,
  idEndereco: number,
  nome: string,
  CNPJ: string, 
  razaoSocial: string, 
  clienteDesde: string,
  rua: string,
  bairro:string,
  cidade:string,
  estado:string,
  cep:string,
  numero:string,
  complemento:string,
  referencia:string,
}

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})

export class EditClientComponent implements OnInit {

  nome:string = '';
  cnpj:string = '';
  razaoSocial = '';
  clienteDesde = '';
  clientes:Array<any> = []
  modal: string = '';
  id: any;
  newAddress: Array<any> = [];
  logradouro: string = '';
  bairro:string = '';
  cidade:string = '';
  uf:string = '';
  cep:string = '';
  numero:string = '';
  complemento:string = '';
  referencia:string = '';
  message: string = '';
  action: string = '';
  enderecos: Array<any> = [];
  selectedGroup: any;
  idEndereco: any;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<EditClientComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataClient, private _snackBar: MatSnackBar, private cepsService: CepServiceService) { }

  ngOnInit(): void {
    this.getAddress();
  }

  openDialog(id: any){
    this.idEndereco=id;
    console.log(id);
    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '500px',
      data: {id : id, logradouro : this.logradouro, bairro : this.bairro, cidade : this.cidade, uf : this.uf, cep: this.cep, numero: this.numero, complemento: this.complemento, referencia: this.referencia, fkClient: this.data.id, enderecos: this.enderecos}
    });
  

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getAddress();
    });
  }

  openSnackBar() {
    this._snackBar.open(this.message, this.action);
  }

  consultaCep(){
    this.cepsService.buscar(String(this.cep)).subscribe((dados) => this.populaForm(dados));
  }

  populaForm(dados: any){
      this.logradouro = dados.logradouro
      this.bairro= dados.bairro,
      this.cidade= dados.localidade,
      this.uf= dados.uf
  }

  async delete(){
    this.clientes =  await this.httpService.patch(`client/${this.data.id}`, {});
    this.message = 'Deletado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  async edit(nome: any, cnpj: any, razaoSocial: any){
    this.editAddress();
    this.nome = nome;
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
    this.clientes =  await this.httpService.put('client/', {id: this.data.id, nome: this.nome, cnpj: this.cnpj, razaoSocial: this.razaoSocial});
    this.message = 'Editado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  async editAddress(){
    this.enderecos.push({logradouro :this.logradouro, bairro :this.bairro, localidade :this.cidade,
       uf :this.uf, cep :this.cep, numero :this.numero, complemento :this.complemento})
  }

 // async addAddress(){
 //   this.newAddress.push({"logradouro" : this.logradouro, "bairro" : this.bairro,
 //     "cidade" : this.cidade, "uf" : this.uf, "cep": this.cep, "numero": this.numero, "complemento": this.complemento, "referencia" : this.referencia});
 //   console.log(this.newAddress); 
 // }

  async getAddress(){
    this.enderecos = await this.httpService.get(`client/${this.data.id}`);
    console.log(this.enderecos)
    
  }

  cancel(): void {
    this.dialogRef.close();
  }

}