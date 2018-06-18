import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'disconnect-remote-dialog',
  templateUrl: './disconnect-remote-dialog.html'
})
export class DialogRemoteDisconnectComponent {

  constructor(private dialogRef: MatDialogRef<DialogRemoteDisconnectComponent>) { }
  close() {
    this.dialogRef.close();
  }
}
