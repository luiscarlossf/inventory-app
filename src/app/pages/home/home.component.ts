import { Component, OnInit } from '@angular/core';
import { CardItem } from 'src/app/models/card-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: any[] = [{
    title:'Equipamentos fora da política', 
    link:'',
    cardItem: {properties:[
      {key:"Com defeito (Doação)", value: 0},
      {key:"Disponível para uso eventual", value: 3},
      {key:"Em uso pela PR/PI", value: 22},
      {key:"Sem uso (Sucata para retirada de peça)", value: 0},
    ]},
  }, 
  {
    title:'Equipamentos dentro da política', 
    link:'',
    cardItem: {properties:[
      {key:"Com defeito (Doação)", value: 1},
      {key:"Disponível para uso eventual", value: 12},
      {key:"Sem uso (Novos na caixa)", value: 4},
      {key:"Em uso", value: 205},
      {key:"Sem uso (Sucata para retirada de peça)", value: 22},
    ]},
  },
  {
    title:'Números sobre os equipamentos', 
    link:'',
    cardItem: {properties:[
      {key:"Equipamentos utilizáveis", value: 246},
      {key:"Total de equipamentos na PR/PI", value: 269},
      {key:"Equipamentos em uso", value: 227},
      {key:"Equipamenots para doação (Com defeito)", value: 1},
      {key:"Equipamentos novos na caixa", value: 4},
      {key:"Equipamentos no estaleiro", value: 15},
      {key:"Equipamentos sucata/doação", value: 22},
    ]},
  }];
  cardItems: CardItem[] = [
    {properties:[
      {key:"Com defeito - para doação", value: 0},
      {key:"Disponível para uso eventual", value: 3},
      {key:"Em uso pela PR/PI", value: 22},
      {key:"Sem uso - Sucata para retirada de peça", value: 0},
    ]},
    {properties:[
      {key:"Com defeito - para doação", value: 1},
      {key:"Disponível para uso eventual", value: 12},
      {key:"Sem uso - novos na caixa", value: 4},
      {key:"Em uso", value: 205},
      {key:"Sem uso - Sucata para retirada de peça", value: 22},
    ]},
    {properties:[
      {key:"Equipamentos utilizáveis", value: 246},
      {key:"Total de equipamentos na PR/PI", value: 269},
      {key:"Equipamentos em uso", value: 227},
      {key:"Equipamenots para doação (con defeito)", value: 1},
      {key:"Equipamentos novos na caixa", value: 4},
      {key:"Equipamentos no estaleiro", value: 15},
      {key:"Equipamentos sucata/doação", value: 22},
    ]},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
