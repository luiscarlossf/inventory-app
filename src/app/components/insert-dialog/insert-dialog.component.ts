import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.css']
})
export class InsertDialogComponent implements OnInit {
  insertForm: FormGroup;

  constructor( private readonly store: Store<AppState>, fb: FormBuilder) { 
    this.insertForm = fb.group({
      'patrimony': [''],
      'brand': [''],
      'category': [''],
      'model': [''],
      'ua': [''],
      'floor': [''],
      'warranty_start': [''],
      'warranty_end': [''],
      'acquisition_date': [''],
      'acquisition_value': [''],
      'policy': [''],
      'status': [''],
      'status_wsus': [''],
      'status_trend': [''],
      'status_zenworks': [''],

    });
  }

  ngOnInit(): void {
  }

}
