import { Component, OnInit } from '@angular/core';
import { ActionService, Action } from '../../services/ActionService';
import { ReversePipe } from 'ngx-pipes';

@Component({
  selector: 'cmd-list',
  templateUrl: './drone-cmd.html'
  , providers: [ReversePipe]
})
export class CommandListComponent implements OnInit {
  aStack: Array<Action>;

  ngOnInit() {

    this.aService.castedActionStack.subscribe(
      x => {
        this.aStack = this.reversePipe.transform(x);
        
      }
    )
  }

  constructor(private aService: ActionService, private reversePipe: ReversePipe) {
    
  }
}
