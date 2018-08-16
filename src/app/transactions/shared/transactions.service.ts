import {Transaction} from "../transaction.model";
import {EventEmitter} from "@angular/core";
import {transactionTypes} from "../transaction-type.model";

export class TransactionsService {
  transactionsChanged = new EventEmitter<void>();
  transactionsFiltered = new EventEmitter<Transaction[]>();

  transactions: Transaction[] = [];
  searchedWeight: number;
  searchedType: string = "-1";

  getTransactions() {
    return this.transactions.slice();
  }

  getTransactionsByWeightAndType(weight: number, typeId: string) {
    this.searchedWeight = weight;
    this.searchedType = typeId;
    const transaction = transactionTypes.filter(type => type.id === typeId)[0];
    const code = transaction != undefined ? transaction.code : 'ALL';
    let transactions: Transaction[];
    if (weight > 0 && typeId !== "-1") {
      transactions = this.transactions.slice().filter(t => (t.weight === weight && t.type === code));
    } else if (weight > 0) {
      transactions = this.transactions.slice().filter(t => t.weight === weight);
    } else if (typeId !== "-1") {
      transactions = this.transactions.slice().filter(t => t.type === code);
    } else {
      transactions = this.getTransactions();
    }
    this.transactionsFiltered.emit(transactions);
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    if (!(this.searchedWeight > 0 || this.searchedType !== "-1")
      || this.transactions.length === 1) {
      this.transactionsChanged.emit();
    }
  }

  deleteTransaction(id: string) {
    this.transactions = this.transactions.filter(t => t.name !== id);
    if (!(this.searchedWeight > 0 || this.searchedType !== "-1")
      || this.transactions.length === 0) {
      this.transactionsChanged.emit();
    }
  }

}
