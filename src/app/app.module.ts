import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'

@NgModule({
    imports: [BrowserModule],
    exports: [AppComponent],
    declarations: [AppComponent],
    providers: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
