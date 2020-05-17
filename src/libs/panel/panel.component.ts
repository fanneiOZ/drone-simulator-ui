import { Component, Input } from '@angular/core'

@Component({
    selector: 'panel',
    templateUrl: './template/panel.template.html'
})
export class PanelComponent {
    private _title: string;
    @Input() toDoList: string[] = []
    @Input()
    set title(value: string) {
        this._title = value
    }
    get title(): string {
        return this._title
    }

    constructor() {
        this._title = ''
    }
}
