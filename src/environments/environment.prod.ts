export const environment = {
  production: true,
  apiUrl: 'http://localhost:8000/',
  status: ['Almoxarifado', 'Doação', 'Sucata', 'Usado'],
  policies: [{title:'Fora da política', value: false}, {title:'Dentro da política', value:true}],
  servers_options: [{title:'Incluido', value:true}, {title:'Fora', value:false}, {title:'Sem registro', value:null}],
};
