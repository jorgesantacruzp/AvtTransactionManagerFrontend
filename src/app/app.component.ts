import {Component, OnInit} from '@angular/core';
import {Transaction} from "./transactions/transaction.model";
import {TransactionsService} from "./transactions/transactions.service";

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

  constructor(private transactionService: TransactionsService) {
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
}
