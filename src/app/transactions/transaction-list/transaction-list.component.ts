import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Transaction} from "../transaction.model";
import {TransactionsService} from "../shared/transactions.service";
import {MatSnackBar} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'weight', 'date', 'delete'];
  @Input('dataSourceInput') dataSource: Transaction[];
  @Output() transactionDeleted = new EventEmitter<void>();
  @Output() transactionFiltered = new EventEmitter<Transaction[]>();

  constructor(private transactionService: TransactionsService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.transactionService.transactionsFiltered.subscribe(
      (transactions: Transaction[]) => this.transactionFiltered.emit(transactions)
    );
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id)
      .subscribe(
        () => {
          this.transactionService.transactions = this.transactionService.transactions.filter(t => t.id !== id);
          this.transactionService.allTransactions = this.transactionService.allTransactions.filter(t => t.id !== id);
          if (!(this.transactionService.searchedWeight > 0 || this.transactionService.searchedType !== "-1")
            || this.transactionService.transactions.length === 0) {
            this.transactionDeleted.emit()
          }
          const weight = this.transactionService.searchedWeight;
          const typeId = this.transactionService.searchedType;
          this.transactionService.getTransactionsByWeightAndTypeFromServer(weight, typeId);
          this.snackBar.open('Transaction deleted', '', {
            duration: 2000,
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, '', {duration: 2000})
        }
      );
  }
}
