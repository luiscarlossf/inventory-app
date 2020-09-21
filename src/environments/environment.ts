// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/',
  status: ['Almoxarifado', 'Doação', 'Sucata', 'Usado'],
  policies: [{title:'Fora da política', value: false}, {title:'Dentro da política', value:true}],
  servers_options: [{title:'Incluido', value:true}, {title:'Fora', value:false}, {title:'Sem registro', value:null}],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
