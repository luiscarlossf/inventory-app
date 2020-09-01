import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
import * as EquipamentActions from '../../redux/equipament/equipament.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store, select} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Equipament, Status } from 'src/app/models/equipament.model';
import { AppState } from 'src/app/app.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

const dados: Equipament[] = [
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'10000000', brand:'Dell', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'20000000', brand:'ASUS', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'30000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'HP', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
  {patrimony:'00000000', brand:'Samsung', category:'Notebook', model:'SM809', ua:'Coordenadoria de TIC', floor:'2 ANDAR', status: Status.Usado , warranty_start: new Date(1997,1,14), warranty_end: new Date(2020,8,9), acquisition_date:new Date(2020,10,10), acquisition_value:2500},
];
@Component({
  selector: 'app-equipaments-table',
  templateUrl: './equipaments-table.component.html',
  styleUrls: ['./equipaments-table.component.css']
})
export class EquipamentsTableComponent implements OnInit {
  dataSource : MatTableDataSource<Equipament>;
  equipaments$: Observable<Array<Equipament>>;
  columnsToDisplay = ['select', 'patrimony', 'brand', 'category', 'model', 'ua', 'floor','status', 'warranty_start','warranty_end', 'acquisition_date', 'acquisition_value'];
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Equipament>(this.allowMultiSelect, this.initialSelection);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private readonly store: Store<AppState>){
    //this.sub$ = of(dados);
    this.dataSource = new MatTableDataSource<Equipament>(dados);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
    //Vincula o ramo equipaments e carrega os equipamentos do servidor.
    this.equipaments$ = this.store.pipe(select(fromEquipament.selectEquipaments));
    this.store.dispatch(EquipamentActions.loadEquipaments());
  }
  
  /**
   * Verifica se o número de elementos selecionados é o 
   * mesmo que o número de linhas.
   */
  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Seleciona todas as linhas se todas não tivere selecionadas ou 
   * limpa a seleção
   */
  masterToggle() {
    this.isAllSelected()? 
      this.selection.clear(): 
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**O rótulo para o checkbox na linha passada */
  checkboxLabel(row?: Equipament): string{
    if(!row){
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.patrimony}`;
  }
}
