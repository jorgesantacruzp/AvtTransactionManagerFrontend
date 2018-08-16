import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.config";
import {HeaderComponent} from "./header/header.component";
import {TransactionsComponent} from "./transactions/transactions.component";
import {TransactionListComponent} from "./transactions/transaction-list/transaction-list.component";
import {TransactionSaveDialog} from "./transactions/transaction-save/transaction-save.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TransactionsService} from "./transactions/shared/transactions.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionsComponent,
    TransactionListComponent,
    TransactionSaveDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [TransactionSaveDialog, TransactionsService],
  entryComponents: [TransactionSaveDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
}
