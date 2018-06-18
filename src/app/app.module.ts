import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule
  , MatDialogModule, MatListModule, MatDividerModule, MatLineModule, MatInputModule, MatFormFieldModule
  , MatTooltipModule, MatChipsModule
  , MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { ActionIconComponent } from './components/action-icon/action-icon';
import { MessageItemComponent } from './components/drone-msg-item/drone-msg-item';
import { MessageListComponent } from './components/drone-msg/drone-msg';
import { CommandItemComponent } from './components/drone-cmd-item/drone-cmd-item';
import { CommandListComponent } from './components/drone-cmd/drone-cmd';
import { ActionButtonComponent } from './components/action-button/action-button';
import { DialogPlaceAtComponent } from './components/place-dialog/place-dialog';
import { DialogDisconnectComponent } from './components/disconnect-dialog/disconnect-dialog';
import { DialogRemoteComponent } from './components/remote-dialog/remote-dialog';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { DialogRemoteDisconnectComponent } from './components/disconnect-remote-dialog/disconnect-dialog';
import { CommandPanelComponent } from './components/drone-cmd-panel/drone-cmd-panel';

import { FormatPositionPipe } from './format-position.pipe';

import { RecentCommandPipe } from './recent-command.pipe';
import { FormatMessagePipe } from './format-message.pipe';





@NgModule({
  declarations: [
    AppComponent
    , ToolbarComponent
    , CommandPanelComponent
    , ActionIconComponent
    , MessageItemComponent
    , MessageListComponent
    , CommandItemComponent
    , CommandListComponent
    , ActionButtonComponent
    , DialogPlaceAtComponent
    , DialogDisconnectComponent
    , DialogRemoteComponent
    , DialogRemoteDisconnectComponent
    , FormatPositionPipe
 
    , RecentCommandPipe, FormatMessagePipe
  ],
  imports: [
    BrowserModule
    , MatToolbarModule
    , MatIconModule, MatButtonModule, MatCardModule, MatDialogModule, MatListModule
    , MatDividerModule, MatLineModule, MatTooltipModule, MatInputModule, MatFormFieldModule, MatChipsModule
    , FlexLayoutModule
    , BrowserAnimationsModule
    , NgPipesModule
    , FormsModule, ReactiveFormsModule
    , MatSelectModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogPlaceAtComponent, DialogDisconnectComponent, DialogRemoteComponent, DialogRemoteDisconnectComponent]
})
export class AppModule { }
