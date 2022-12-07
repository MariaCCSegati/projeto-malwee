import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { CepServiceService } from '../cep-service.service';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { DialogDataClient, ModalClientComponent } from '../modal-client/modal-client.component';

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

  constructor(private httpService : HttpService, public dialogRef: MatDialogRef<EditClientComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataClient, private cepsService: CepServiceService) { }

  ngOnInit(): void {
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
    this.enderecos =  await this.httpService.patch(`address/${this.data.idEndereco}`, {});
    console.log(this.enderecos)
    this.message = 'Deletado!'
    this.action = 'OK'
    this.dialogRef.close();
  }

}
