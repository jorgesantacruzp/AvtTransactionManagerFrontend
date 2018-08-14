import {Component, Inject, ViewChild, ElementRef, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {transactionTypes, dataStructures, TransactionType} from "../transaction-type.model";
import {TransactionsService} from "../transactions.service";
import {Transaction} from "../transaction.model";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'transaction-save-dialog',
  templateUrl: './transaction-save.component.html',
  styleUrls: ['./transaction-save.component.css']
})
export class TransactionSaveDialog implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('weightInput') weightInputRef: ElementRef;
  types: TransactionType[] = transactionTypes.filter(t => t.id !== "-1");
  dataStructures: string[] = dataStructures;
  selectedType: string = '-1';
  selectedDs: string = dataStructures[0];
  emptyList: boolean = false;

  constructor(public dialogRef: MatDialogRef<TransactionSaveDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private transactionService: TransactionsService) {
  }

  onSaveButton(selectedType: string, selectedDs: string): void {
    this.emptyList = selectedType === "-1";
    const name = this.nameInputRef.nativeElement.value;
    const weight = this.weightInputRef.nativeElement.value;
    const transaction = new Transaction(5, name, weight, selectedType, new Date(), selectedDs);
    this.transactionService.addTransaction(transaction);
    this.dialogRef.close();
  }
}
