import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  selectedEndereco: number | undefined;
  public enderecos : Array<any> = [];
  nome = '';
  pedidos: Array<any> = [];

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
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
    this.enderecos = await this.httpService.get('collection');
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
