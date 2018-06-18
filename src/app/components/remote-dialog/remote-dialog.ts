import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionService } from '../../services/ActionService';

@Component({
  selector: 'remote-dialog',
  templateUrl: './remote-dialog.html'
})
export class DialogRemoteComponent implements OnInit {
  form: FormGroup;
  remoteClientID: string;


  constructor(
    private fb: FormBuilder,
    public aService: ActionService,
    private dialogRef: MatDialogRef<DialogRemoteComponent>) {
    
  }
    
  ngOnInit() {
    this.form = this.fb.group({
      remoteClientID: [null, []]
    });
  }

  save() {
    if (this.form.value.remoteClientID != null) {
      this.dialogRef.close(this.form.value);
    } else this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
