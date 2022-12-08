import { Component, OnInit } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { HttpService } from 'src/services/http.service';

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
  produtos:Array<any> = []

  constructor(private httpService : HttpService) { }

  async ngOnInit() {
     await this.get();
  }

  async get(){
    this.produtos = await this.httpService.get('product');
  }

  insert(){
    
  }

}
