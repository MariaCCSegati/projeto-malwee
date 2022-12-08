import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/services/http.service';
import { CepServiceService } from '../cep-service.service';
import { EditClientComponent } from '../edit-client/edit-client.component';

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
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  clientes:Array<any> = [];
  id: number | undefined;
  bairro:string = '';
  cidade:string = '';
  uf:string = '';
  cep:string = '';
  numero:string = '';
  complemento:string = '';
  referencia:string = '';
  createdAt: Date | undefined;
  logradouro: string='';
  message: string = '';
  action: string = '';
  enderecos: Array<any> = [];

  constructor(private _snackBar: MatSnackBar, private httpService : HttpService, public dialogRef: MatDialogRef<EditClientComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataClient, private cepsService: CepServiceService) { }

  ngOnInit(): void {
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

  cancel(): void {
    this.dialogRef.close();
  }
  async delete(){
    console.log(this.data.id)
    this.enderecos =  await this.httpService.patch(`address/${this.data.id}`, {});
    console.log(this.enderecos)
    this.message = 'Deletado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

  async edit(){
    console.log(this.data.id)
    console.log(this.logradouro)
    this.clientes =  await this.httpService.put('address/', {id: this.data.id, logradouro: this.logradouro, bairro: this.bairro, cidade: this.cidade, uf: this.uf, cep: this.cep, numero: this.numero, complemento: this.complemento, referencia: this.referencia});
    this.message = 'Editado!'
    this.action = 'OK'
    this.openSnackBar();
    this.dialogRef.close();
  }

}
