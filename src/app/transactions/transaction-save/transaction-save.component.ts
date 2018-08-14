import {Component, Inject, ViewChild, ElementRef} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {transactionTypes, dataStructures, TransactionType} from "../transaction-type.model";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'transaction-save-dialog',
  templateUrl: './transaction-save.component.html',
  styleUrls: ['./transaction-save.component.css']
})
export class TransactionSaveDialog {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('weightInput') weightInputRef: ElementRef;
  types: TransactionType[] = transactionTypes;
  dataStructures: string[] = dataStructures;
  selectedType: string = '-1';
  selectedDs: string = dataStructures[0];
  emptyList: boolean = false;

  constructor(public dialogRef: MatDialogRef<TransactionSaveDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onSaveButton(selectedType: string, selectedDs: string): void {
    this.emptyList = selectedType === "-1";
    const name = this.nameInputRef.nativeElement.value;
    const weight = this.weightInputRef.nativeElement.value;
    alert(name + " - " + weight + " - " + selectedType + " - " + selectedDs);
  }
}
