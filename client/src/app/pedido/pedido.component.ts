import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';
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
  referencia:string
}
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  selectedEndereco: number | undefined;
  public enderecos : Array<any> = [];
  public clientes : Array<any> = [];
  nome = '';
  pedidos: Array<any> = [];

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogDataClient) { }

  myControl = new FormControl('');
  options: string[] = this.clientes;
  filteredOptions: Observable<string[]> | undefined;

  async ngOnInit() {
    await this.filtro()
  }

  filtro(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async getEndereco(){
    this.enderecos = await this.httpService.get('client');
  }

  async getClientes(){
    this.clientes = await this.httpService.get('client');
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalPedidoComponent, {
      width: '550px',
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');

    });
  }
}
