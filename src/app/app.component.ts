import {Component, OnInit} from '@angular/core';
import {Transaction} from "./transactions/transaction.model";
import {TransactionsService} from "./transactions/transactions.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  transactions: Transaction[];
  dataSourceCheckChange: Transaction[];
  dataSourceMoneyTransfer: Transaction[];
  dataSourcePayrollPayment: Transaction[];

  constructor(private transactionService: TransactionsService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.updateTransactionsList();
    this.transactionService.transactionsChanged.subscribe(
      () => this.updateTransactionsList()
    );
  }

  updateTransactionsList() {
    this.transactions = this.transactionService.getTransactions();
    this.dataSourceCheckChange = this.transactions.filter(t => t.type === 'CHECK_CHANGE');
    this.dataSourceMoneyTransfer = this.transactions.filter(t => t.type === 'MONEY_TRANSFER');
    this.dataSourcePayrollPayment = this.transactions.filter(t => t.type === 'PAYROLL_PAYMENT');
  }

  changeRepository(repository: string) {
    this.snackBar.open('Repository was changed to ' + repository, '', {
      duration: 2000,
    });
  }

}
