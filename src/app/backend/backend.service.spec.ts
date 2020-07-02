//Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

//Other imports
import { TestBed } from '@angular/core/testing';
import { BackendService } from './backend.service';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../brand/brand.model';
import { normalize } from 'path';

describe('BackendService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ BackendService ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('listAll()', ()=>{
    it('should return a list of brands', () => {
      let responseData = {"count":41,"next":"http://10.0.0.107:8000/v1/brands?format=json&page=2","previous":null,"results":[{"url":"http://10.0.0.107:8000/v1/brands/323?format=json","name":"3COM"},{"url":"http://10.0.0.107:8000/v1/brands/332?format=json","name":"AMP"},{"url":"http://10.0.0.107:8000/v1/brands/313?format=json","name":"AOC"},{"url":"http://10.0.0.107:8000/v1/brands/333?format=json","name":"APPLE"},{"url":"http://10.0.0.107:8000/v1/brands/329?format=json","name":"ARGOX"},{"url":"http://10.0.0.107:8000/v1/brands/350?format=json","name":"AVENSIS"},{"url":"http://10.0.0.107:8000/v1/brands/330?format=json","name":"AVISION"},{"url":"http://10.0.0.107:8000/v1/brands/345?format=json","name":"BEMATECH"},{"url":"http://10.0.0.107:8000/v1/brands/343?format=json","name":"BITATEK"},{"url":"http://10.0.0.107:8000/v1/brands/341?format=json","name":"BLACKMAGIC"}]};
      let expectedBrands = [{"url":"http://10.0.0.107:8000/v1/brands/323?format=json","name":"3COM"},{"url":"http://10.0.0.107:8000/v1/brands/332?format=json","name":"AMP"},{"url":"http://10.0.0.107:8000/v1/brands/313?format=json","name":"AOC"},{"url":"http://10.0.0.107:8000/v1/brands/333?format=json","name":"APPLE"},{"url":"http://10.0.0.107:8000/v1/brands/329?format=json","name":"ARGOX"},{"url":"http://10.0.0.107:8000/v1/brands/350?format=json","name":"AVENSIS"},{"url":"http://10.0.0.107:8000/v1/brands/330?format=json","name":"AVISION"},{"url":"http://10.0.0.107:8000/v1/brands/345?format=json","name":"BEMATECH"},{"url":"http://10.0.0.107:8000/v1/brands/343?format=json","name":"BITATEK"},{"url":"http://10.0.0.107:8000/v1/brands/341?format=json","name":"BLACKMAGIC"}];
      
      service.listAll('brands').subscribe(
        response =>{
          let brands = response.body["results"];
          expect(brands).toEqual(expectedBrands);
          expect(response.status).toBe(200);
      });

      const req = httpTestingController.expectOne('http://10.0.0.107:8000/v1/brands');
      
      expect(req.request.method).toEqual('GET');

      //Responde com dados simulados
      req.flush(responseData, {
        headers: {
          'Allow': 'GET, POST, HEAD, OPTIONS',
          'Content-Type': 'application/json',
          'Vary': 'Accept'
        },status: 200, statusText: 'OK'});

      //Afirma que não há nenhuma requisição pendente
      httpTestingController.verify();

    });
  });


  describe('create()', ()=>{
    it('should create new brand', ()=>{
      let newBrand = {
        name: 'NewBrand',
      }
      let expectedBrand = {
        "url": "http://10.0.0.107:8000/v1/brands/352",
        "name": "NewBrand"
      };

      service.create<Brand>('brands', newBrand).subscribe(
        response =>{
          expect(response.status).toBe(201);
          expect(response.body).toEqual(expectedBrand);
        });
      
      const req = httpTestingController.expectOne('http://10.0.0.107:8000/v1/brands');

      expect(req.request.method).toEqual('POST');

      expect(req.request.body.name).toEqual(newBrand.name);

      req.flush(expectedBrand, {
        headers: {
          'Allow': 'GET, POST, HEAD, OPTIONS',
          'Content-Type': 'application/json',
          'Location': 'http://10.0.0.107:8000/v1/brands/352',
          'Vary': 'Accept'
        },status: 201, statusText: 'Created'});
      
      httpTestingController.verify();

    });
  });


  describe('retrieveById()', ()=>{
    it('should return a specific brand', () =>{
      let expectedBrand = {
        "url": "http://10.0.0.107:8000/v1/brands/352",
        "name": "Brand"
      };

      service.retrieveById<Brand>(expectedBrand.url).subscribe(
        response =>{
          expect(response.status).toBe(200);
          expect(response.body).toEqual(expectedBrand);
        });
      
      const req = httpTestingController.expectOne('http://10.0.0.107:8000/v1/brands/352');

      expect(req.request.method).toEqual('GET');

      expect(req.request.url).toContain('http://10.0.0.107:8000/v1/brands/352');

      req.flush(expectedBrand, {
        headers: {
          'Allow': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
          'Content-Type': 'application/json',
          'Vary': 'Accept'
        },status: 200, statusText: 'OK'});
      
      httpTestingController.verify();

    })
  });


  describe('updateById()', ()=>{
    it('should update a specific brand', () => {
      let newBrand = {
        url: "http://10.0.0.107:8000/v1/brands/352",
        name: "Brand"
      };

      service.updateById<Brand>(newBrand.url, newBrand).subscribe(
        response =>{
          expect(response.status).toBe(200);
          expect(response.body).toEqual(newBrand);
        });
      
      const req = httpTestingController.expectOne('http://10.0.0.107:8000/v1/brands/352');

      expect(req.request.method).toEqual('PUT');

      expect(req.request.url).toEqual('http://10.0.0.107:8000/v1/brands/352');

      req.flush(newBrand, {
        headers: {
          'Allow': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
          'Content-Type': 'application/json',
          'Vary': 'Accept'
        },status: 200, statusText: 'OK'});
      
      httpTestingController.verify();

    })
  });


  describe('partialUpdateById()', ()=>{
    it('should partially update a specific brand', () => {
      let newBrand = {
        name: "NewBrand"
      };

      let expectedBrand = {
        url: 'http://10.0.0.107:8000/v1/brands/352',
        name: "NewBrand"
      }

      service.partialUpdateById<Brand>('http://10.0.0.107:8000/v1/brands/352', newBrand).subscribe(
        response =>{
          expect(response.status).toBe(200);
          expect(response.body).toEqual(expectedBrand);
        });
      
      const req = httpTestingController.expectOne('http://10.0.0.107:8000/v1/brands/352');

      expect(req.request.method).toEqual('PATCH');

      expect(req.request.url).toEqual('http://10.0.0.107:8000/v1/brands/352');

      req.flush(expectedBrand, {
        headers: {
          'Allow': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
          'Content-Type': 'application/json',
          'Vary': 'Accept'
        },status: 200, statusText: 'OK'});
      
      httpTestingController.verify();
    });
  });


  describe('destroyById()', ()=>{
    it('should delete a specific brand', () => {
      let expectedBrand = {
        url: "http://10.0.0.107:8000/v1/brands/352",
        name: "Brand"
      };
  
      service.destroyById<Brand>(expectedBrand.url).subscribe(
        response =>{
          expect(response.status).toBe(204);
        });
      
      const req = httpTestingController.expectOne('http://10.0.0.107:8000/v1/brands/352');
  
      expect(req.request.method).toEqual('DELETE');
  
      expect(req.request.url).toContain('http://10.0.0.107:8000/v1/brands/352');
  
      req.flush(expectedBrand, {
        headers: {
          'Allow': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
          'Content-Type': 'application/json',
          'Vary': 'Accept'
        },status: 204, statusText: 'No Content'});
      
      httpTestingController.verify();
    });
  });


});
