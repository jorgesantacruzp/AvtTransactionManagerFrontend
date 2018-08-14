import {Component, ViewChild, ElementRef} from '@angular/core';
import {transactionTypes, TransactionType} from "./transaction-type.model";
import {MatDialog} from "@angular/material";
import {TransactionSaveDialog} from "./transaction-save/transaction-save.component";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  @ViewChild('weightInput') weightInputRef: ElementRef;

  types: TransactionType[] = transactionTypes;
  selectedType: string = '-1';

  constructor(public dialog: MatDialog) {
  }

  onSearch(selected: string) {
    const weight = this.weightInputRef.nativeElement.value;
    alert(weight + " - " + selected);
    // get transactions by weight and type
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
