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

  constructor(private transactionService: TransactionsService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.transactionService.transactionsChanged.subscribe(
      () => this.transactionDeleted.emit()
    );
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id);
    this.snackBar.open('Transaction deleted', '', {
      duration: 2000,
    });
  }
}
