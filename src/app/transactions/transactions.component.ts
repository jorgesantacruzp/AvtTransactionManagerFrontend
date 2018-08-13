import {Component, ViewChild, ElementRef} from '@angular/core';
import {transactionTypes, TransactionType} from "./transaction-type.model";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  @ViewChild('weightInput') weightInputRef: ElementRef;

  types: TransactionType[] = transactionTypes;
  selectedType: string = '-1';

  onSearch(selected: string) {
    const weight = this.weightInputRef.nativeElement.value;
    alert(weight + " - " + selected);
    // get transactions by weight and type
  }
}
