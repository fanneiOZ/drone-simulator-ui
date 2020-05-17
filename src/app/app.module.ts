import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { PanelComponent } from 'libs/panel/panel.component'

@NgModule({
    imports: [BrowserModule],
    exports: [AppComponent],
    declarations: [AppComponent, PanelComponent],
    providers: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
