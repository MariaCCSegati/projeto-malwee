import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CpuInfo } from 'os';
import { CompleteNotification } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import { CepServiceService } from '../cep-service.service';

export interface DialogDataClient{
  id: number,
  nome: string,
  CNPJ: string, 
  razaoSocial: string, 
  clienteDesde: Date,
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
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})

export class ModalClientComponent implements OnInit {

  nome:string = '';
  cnpj:string = '';
  razaoSocial = '';
  clienteDesde: Date | undefined;
  clientes:Array<any> = [];
  id: number | undefined;
  newAddress: Array<any> = [];
  bairro:string = '';
  cidade:string = '';
  uf:string = '';
  cep:string = '';
  numero:string = '';
  complemento:string = '';
  referencia:string = '';
  createdAt: Date | undefined;
  logradouro: string='';
  

  constructor(
    public dialogRef: MatDialogRef<ModalClientComponent>, private http : HttpClient, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) public data: DialogDataClient, private cepsService: CepServiceService
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
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
  async addAddress(){
    this.newAddress.push({"logradouro" : this.logradouro, "bairro" : this.bairro,
      "cidade" : this.cidade, "uf" : this.uf, "cep": this.cep, "numero": this.numero, "complemento": this.complemento, "referencia" : this.referencia});
    console.log(this.newAddress)
  }

  async insert(){
    if(this.cnpj.length < 14 || this.cnpj.length > 14){
      alert('cnpj precisa ter no 14 caracteres')
    } else {
      this.clientes =  await this.httpService.post('client', {nome : this.nome, CNPJ : this.cnpj, razaoSocial : this.razaoSocial, clienteDesde : this.createdAt, address: this.newAddress});
      console.log(this.nome);
      alert('adicionado');
    }
    
  }


}
