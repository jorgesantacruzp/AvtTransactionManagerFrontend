import {Component, OnInit, HostListener} from '@angular/core';
import {Transaction} from "./transactions/transaction.model";
import {TransactionsService} from "./transactions/shared/transactions.service";
import {MatSnackBar} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  transactions: Transaction[] = [];

  ngOnInit(): void {
    this.updateTransactionsList(true);
    this.transactionService.transactionsChanged.subscribe(
      () => this.updateTransactionsList(false)
    );
    this.transactionService.errorHappened.subscribe(
      (errorMessage: string) => {
        this.snackBar.open(errorMessage, '', {duration: 2000})
      }
    );
  }

  filteredTransactions: Transaction[] = [];
  dataSourceCheckChange: Transaction[];
  dataSourceMoneyTransfer: Transaction[];
  dataSourcePayrollPayment: Transaction[];

  noTransactionsFound: boolean = false;

  constructor(private transactionService: TransactionsService,
              public snackBar: MatSnackBar) {
  }

  updateTransactionsList(isFirstTime: boolean) {
    if (isFirstTime) {
      this.transactionService.getTransactionsFromServer(0, "-1");
    } else {
      this.transactions = this.transactionService.getTransactions();
    }
    this.dataSourceCheckChange = this.transactions.filter(t => t.type === 'CHECK_CHANGE');
    this.dataSourceMoneyTransfer = this.transactions.filter(t => t.type === 'MONEY_TRANSFER');
    this.dataSourcePayrollPayment = this.transactions.filter(t => t.type === 'PAYROLL_PAYMENT');
  }

  filterTransactions(transactions: Transaction[]) {
    this.noTransactionsFound = transactions.length === 0 && this.transactionService.allTransactions.length > 0;
    this.filteredTransactions = transactions;
    this.dataSourceCheckChange = this.filteredTransactions.filter(t => t.type === 'CHECK_CHANGE');
    this.dataSourceMoneyTransfer = this.filteredTransactions.filter(t => t.type === 'MONEY_TRANSFER');
    this.dataSourcePayrollPayment = this.filteredTransactions.filter(t => t.type === 'PAYROLL_PAYMENT');
  }

  changeRepository(repository: string) {
    this.transactionService.changeRepository(repository)
      .subscribe(
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    this.snackBar.open('Repository was changed to ' + repository, '', {
      duration: 2000,
    });
  }

  showRepositoryChoiceSection() {
    return this.transactionService.allTransactions.length == 0;
  }

  @HostListener('window:unload', ['$event'])
  unloadHander(event) {
    // clean data structures in memory
    this.transactionService.deleteTransactionsInMemory()
      .subscribe(
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    // clean data structures in memory
    this.transactionService.deleteTransactionsInMemory()
      .subscribe(
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

}
