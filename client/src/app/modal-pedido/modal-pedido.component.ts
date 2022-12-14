import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
export interface DialogDataPedido{
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
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.scss']
})

export class ModalPedidoComponent implements OnInit {

  

  qtd: number | undefined;
  valorUnidade: number | undefined;
  acrescimo: number| undefined;
  decrescimo: number| undefined;
  total: number | undefined;
  selectedGroup: number = 0;
  selectedGroup2: number = 0;
  selectedGroup3: number = 0;
  produtos:Array<any> = []
  clientes:Array<any> = []
  createdAt: Date | undefined;
  entrega: Date = new Date();
  emissao: Date | undefined;
  idCliente: number | undefined;
  idEndereco: number | undefined;
  idProduct: number | undefined;
  idPedido: number | undefined;
  newProduct: Array<any> = [];
  enderecos: Array<any> = [];
  id: any;
  nome: string | undefined;
  public products : Array<any> = [];
  client : number = 0;
  fkProduct : number | undefined;
  description: string = '';
  totalProduct: number = 0;
  again: number | undefined;
  valorU: number = 0;
  product: string = '';
  requests: Array<any> = [];
  desc : number | undefined;
  acres : number | undefined;
  

  constructor(private httpService : HttpService,  @Inject(MAT_DIALOG_DATA) public data: DialogDataPedido,  private http : HttpClient) { }

  async ngOnInit() {
     await this.getProdutos();
     await this.getClientes();
     await this.getEnderecos();
  }
  

  async add(description : string, id : number, price : number) {
    console.log(id);
    this.fkProduct = id;
    this.description = description;
    this.totalProduct = price;
    this.again = 1;
    this.valorU = price;
    this.produtos = await this.httpService.get(`product/${id}`);
    console.log(this.product);
  }

  async add2(nome: string, id: number) {
    console.log(id);
    this.idCliente = id;
    this.nome = nome;
    this.again = 1;
    this.clientes = await this.httpService.get(`client/${id}`);
    console.log(this.clientes);
  }
  
  async get(){
    this.requests = await this.httpService.get('pedidos')
  }

  async getProdutos(){
    this.produtos = await this.httpService.get('product');
  }

  async getClientes(){
    this.clientes = await this.httpService.get('client');
  }

  async getEnderecos(){
    console.log(this.idCliente)
    this.enderecos = await this.httpService.get(`client/${this.idCliente}`);
  }

  async insert(){
    this.produtos =  await this.httpService.post('pedidos', {emissao: this.createdAt, entrega: this.entrega, fkClient: this.idCliente, fkAddress: this.idEndereco, total: this.total, pedido: this.newProduct});
  }

  //async addProduto(){
  //  this.newProduct.push({"fkPedidos" : this.idPedido, "fkProduct" : this.idProduct,
  //    "valorUnitario" : this.valorUnidade, "decrescimo" : this.decrescimo, "acrescimo": this.acrescimo});
  //  console.log(this.newProduct)
  //}
//
  //async getAddress(){
  //  this.enderecos = await this.httpService.get(`client/${this.data.id}`);
  //  console.log(this.enderecos);
  //}

}
