import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalClientComponent } from '../modal-client/modal-client.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
export interface DialogDataClient {
  id: number,
  nome: string,
  CNPJ: string, 
  razaoSocial: string, 
  clienteDesde: string,
  logradouro: string,
  referencia: string
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  nome:string = '';
  cnpj:string = '';
  razaoSocial = '';
  clienteDesde = '';
  clientes:Array<any> = []
  modal: string = '';
  id: any;
  address:Array<any> = []

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
    this.modal = 'false';
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalClientComponent, {
      width: '500px',
      data: {id : this.id, nome : this.nome, cnpj : this.cnpj, razaoSocial : this.razaoSocial, clienteDesde : this.clienteDesde, address: this.address}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.list();
    });
  }

  openDialog2(clientes: any, id: any, nome: any, CNPJ: any, razaoSocial: any, clienteDesde: any){
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '700px',
      data: {clientes: clientes, id : id, nome : nome, cnpj : CNPJ, razaoSocial : razaoSocial, clienteDesde : clienteDesde, address: this.address}
    });
   

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.list();
    });
  }

  teste(){
    this.clientes.push({ nome : this.nome, cnpj : this.cnpj, razaoSocial : this.razaoSocial, clienteDesde : this.clienteDesde})
    console.log(this.clientes)
  }

  async list(){
    this.clientes = await this.httpService.get('client');
    console.log(this.clientes)
  }
}
