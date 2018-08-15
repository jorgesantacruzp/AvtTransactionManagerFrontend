import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Transaction} from "../transaction.model";
import {TransactionsService} from "../transactions.service";
import {MatSnackBar} from "@angular/material";

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
    this.transactionService.transactionsChanged.subscribe(
      () => this.transactionDeleted.emit()
    );
    this.transactionService.transactionsFiltered.subscribe(
      (transactions: Transaction[]) => this.transactionFiltered.emit(transactions)
    );
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id);
    const weight = this.transactionService.searchedWeight;
    const typeId = this.transactionService.searchedType;
    this.transactionService.getTransactionsByWeightAndType(weight, typeId);
    this.snackBar.open('Transaction deleted', '', {
      duration: 2000,
    });
  }
}
