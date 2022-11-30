import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
import { CepServiceService } from '../cep-service.service';
export interface DialogDataClient{
  id: number,
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

  constructor(public dialogRef: MatDialogRef<EditClientComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataClient, private _snackBar: MatSnackBar, private cepsService: CepServiceService) { }

  ngOnInit(): void {
  }

  openSnackBar() {
    //this.message = 'Adicionado!'
    //this.action = 'Ok'
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
    this.data.nome = nome;
    this.data.CNPJ = cnpj;
    this.data.razaoSocial = razaoSocial;
    this.clientes =  await this.httpService.put('client/', {id: this.data.id, nome: this.data.nome, cnpj: this.data.CNPJ, razaoSocial: this.data.razaoSocial});
    this.message = 'Editado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  //async addAddress(rua: any, bairro: any, cidade: any, estado: any, cep: any, numero: any, complemento: any, referencia: any){
  //  this.newAddress.push({rua : rua, bairro : bairro,
  //    cidade : cidade, estado : estado, cep: cep, numero: numero, complemento: complemento, referencia : referencia, fkClient: this.data.id});
  //  
  //  console.log(this.newAddress)
  //}

  async addAddress(){
    this.newAddress.push({"logradouro" : this.logradouro, "bairro" : this.bairro,
      "cidade" : this.cidade, "uf" : this.uf, "cep": this.cep, "numero": this.numero, "complemento": this.complemento, "referencia" : this.referencia});
    console.log(this.newAddress)
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
