import {Component, ViewChild, ElementRef, OnInit, EventEmitter, Output} from '@angular/core';
import {transactionTypes, TransactionType} from "./transaction-type.model";
import {MatDialog} from "@angular/material";
import {TransactionSaveDialog} from "./transaction-save/transaction-save.component";
import {TransactionsService} from "./transactions.service";
import {Transaction} from "./transaction.model";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  @Output() transactionCreated = new EventEmitter<void>();
  @Output() transactionFiltered = new EventEmitter<Transaction[]>();
  @ViewChild('weightInput') weightInputRef: ElementRef;

  types: TransactionType[] = transactionTypes;
  selectedType: string = '-1';

  constructor(public dialog: MatDialog,
              private transactionService: TransactionsService) {
  }

  ngOnInit(): void {
    this.transactionService.transactionsChanged.subscribe(
      () => this.transactionCreated.emit()
    );
    this.transactionService.transactionsFiltered.subscribe(
      (transactions: Transaction[]) => this.transactionFiltered.emit(transactions)
    );
  }

  onSearch(selected: string) {
    const weight = this.weightInputRef.nativeElement.value;
    this.transactionService.getTransactionsByWeightAndType(weight, selected);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionSaveDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
