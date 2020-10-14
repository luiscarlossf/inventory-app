import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-equipaments-table',
  templateUrl: './equipaments-table.component.html',
  styleUrls: ['./equipaments-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight:'0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EquipamentsTableComponent implements OnInit {
  dataSource : MatTableDataSource<Equipament>;
  @Input() equipaments$: Observable<Array<Equipament>>;
  filter: string;
  columnsToDisplay = ['select', 'patrimony', 'brand', 'category', 'model', 'ua', 'floor','status', 'warranty', 'acquisition_date', 'acquisition_value', 'policy', 'zenworks', 'wsus', 'trend'];
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Equipament>(this.allowMultiSelect, this.initialSelection);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  expandedElement: Equipament | null;

  constructor(private readonly store: Store<AppState>, public dialog: MatDialog){
    this.dataSource = new MatTableDataSource<Equipament>();
  }

  ngOnInit() {
    this.equipaments$.subscribe( equipaments =>{
      this.dataSource.data = equipaments;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Filtra os elementos da tabela
   */

   filtrar(filtro: string){
    this.filter = filtro;
    if(filtro)
      this.dataSource.filter = filtro.trim().toLowerCase();
    else
      this.dataSource.filter = null;
   }

   applyFilters(filters: any){
    console.log('Appying filters: ', filters);
    this.equipaments$.subscribe(equipaments => {
      let aux = equipaments;
      if((filters.brands !== "")&&(filters.brands.length !== 0)){
        console.log('Filtrando por marcas...');
        aux = aux.filter(equipament => filters.brands.includes(equipament.brand));
      }
      if((filters.categories !== "")&&(filters.categories.length !== 0)){
        aux = aux.filter(equipament => filters.categories.includes(equipament.category));
      }
  
      
      if((filters.models !== "")&&(filters.models.length !== 0)){
        aux = aux.filter(equipament => filters.models.includes(equipament.model));
      }
      
      if((filters.uas !== "")&&(filters.uas.length !== 0)){
        aux = aux.filter(equipament => filters.uas.includes(equipament.ua));
      }
      
      if((filters.floors !== "") &&(filters.floorslength !== 0)){
        aux = aux.filter(equipament => filters.floors.includes(equipament.floor));
      }
      
      if(filters.warranty_start && filters.warranty_end){
        aux = aux.filter(equipament => (equipament.warranty_start >= filters.warranty_start) && (equipament.warranty_end <= filters.warranty_end));
      }
      
      if(filters.min_date && filters.max_date){
        aux = aux.filter(equipament => (equipament.acquisition_date >= filters.min_date) && (equipament.acquisition_date <= filters.max_date));
      }
      
      if(filters.min_value !== ""){
        aux = aux.filter(equipament => equipament.acquisition_value >= filters.min_value);
      }
  
      if(filters.max_value !== ""){
        aux = aux.filter(equipament => equipament.acquisition_value <= filters.max_value);
      }
  
      if((filters.policies !== "")&& (filters.status_trend.length !== 0)){
        aux = aux.filter(equipament => filters.policies.includes(equipament.policy));
      }
      
      if((filters.status !== "")&&(filters.status.length !== 0)){
        aux = aux.filter(equipament => filters.status.includes(equipament.status));
      }
  
      if((filters.status_wsus !== "")&&(filters.status_wsus.length !== 0)){
        aux = aux.filter(equipament => filters.status_wsus.includes(equipament.status_wsus));
      }
  
      if((filters.status_trend !== "")&&(filters.status_trend.length !== 0)){
        aux = aux.filter(equipament => filters.status_trend.includes(equipament.status_trend));
      }
  
      if((filters.status_zenworks !== "")&&(filters.status_zenworks.length !== 0)){
        aux = aux.filter(equipament => filters.status_zenworks.includes(equipament.status_zenworks));
      }
      this.dataSource.data = aux;
    });
  }

  resetFilters(){
    this.equipaments$.subscribe(equipaments => this.dataSource.data = equipaments);
  }

  /**
   * Retorna todos os elementos selecionados na tabela
   */

   getSelecteds(){
     return this.dataSource.data.filter(row => this.selection.isSelected(row));
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

  /**
   * Dispara a ação de edição de um equipamento
   * @param data equipamento que vai ser editado.
   */
  editEquipament(data: Equipament){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data:data,
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.store.dispatch(EquipamentActions.updateEquipament({equipament:({...data, ...result} as Equipament)}));
      }
    });
  }

  removeEquipament(data: Equipament){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title:"Removendo equipamento", 
              message:`Deseja realmente remover o equipamento ${data.patrimony}?`}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.store.dispatch(EquipamentActions.deleteEquipament({equipament: data}));
      }
    });
  }
}
