import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { AgGridModule } from "@ag-grid-community/angular";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AgGridModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
