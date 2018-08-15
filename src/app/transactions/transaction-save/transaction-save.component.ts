import {Component, Inject, ViewChild, ElementRef, Renderer2} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {transactionTypes, dataStructures, TransactionType} from "../transaction-type.model";
import {TransactionsService} from "../transactions.service";
import {Transaction} from "../transaction.model";
import {FormControl, Validators} from "@angular/forms";

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
  types: TransactionType[] = transactionTypes.filter(t => t.id !== "-1");
  dataStructures: string[] = dataStructures;
  selectedType: string = 'CHECK_CHANGE';
  selectedDs: string = dataStructures[0];
  emptyList: boolean = false;

  nameForm = new FormControl('', [Validators.required]);
  weightForm = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<TransactionSaveDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private transactionService: TransactionsService,
              private renderer: Renderer2,
              public snackBar: MatSnackBar) {
  }

  onSaveButton(selectedType: string, selectedDs: string): void {
    this.emptyList = selectedType === "CHECK_CHANGE";
    const name = this.nameInputRef.nativeElement.value;
    const weight = this.weightInputRef.nativeElement.value;
    const transaction = new Transaction("5", name, weight, selectedType, "14/08/2018", selectedDs);

    const weightElement = this.renderer.selectRootElement('#weight');
    const nameElement = this.renderer.selectRootElement('#name');

    if (name === '' && weight === '') {
      setTimeout(() => weightElement.focus(), 0);
      setTimeout(() => nameElement.focus(), 0);
    } else if (name === '') {
      setTimeout(() => nameElement.focus(), 0);
    } else if (weight === '') {
      setTimeout(() => weightElement.focus(), 0);
      setTimeout(() => nameElement.focus(), 0);
      setTimeout(() => weightElement.focus(), 0);
    } else {
      this.transactionService.addTransaction(transaction);
      const weight = this.transactionService.searchedWeight;
      const typeId = this.transactionService.searchedType;
      this.transactionService.getTransactionsByWeightAndType(weight, typeId);
      this.dialogRef.close();
      this.snackBar.open('Transaction saved', '', {
        duration: 2000,
      });
    }
  }

  getNameErrorMessage() {
    return this.nameForm.hasError('required') ? 'You must enter a name' : '';
  }

  getWeightErrorMessage() {
    return this.weightForm.hasError('required') ? 'You must enter a weight' : '';
  }
}
