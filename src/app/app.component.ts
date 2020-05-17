import { Component } from '@angular/core'

@Component({
    selector: 'app',
    templateUrl: './template/app.template.html',
})
export class AppComponent {
    name: string = 'Just test'
    appMessage: string = 'By pass the container message'
    list: string[] = ['a','b','c','e']

    constructor() {
      setInterval(() => {
        this.list.push('auto')
      }, 5000)
    }
}
