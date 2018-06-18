import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'placeAt-dialog',
  templateUrl: './place-dialog.html'
})
export class DialogPlaceAtComponent implements OnInit {
  form: FormGroup;
  x: number;
  y: number;
  
  selectDirectionValue = [
    { value: 'NORTH', viewValue: 'Toward north' },
    { value: 'EAST', viewValue: 'Toward east' },
    { value: 'WEST', viewValue: 'Toward west' },
    { value: 'SOUTH', viewValue: 'Toward south' }
  ];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogPlaceAtComponent>) {
    
  }
    
  ngOnInit() {
    this.form = this.fb.group({
      x: [null, Validators.required],
      y: [null, Validators.required],
      direction: [null, Validators.required]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }


}
