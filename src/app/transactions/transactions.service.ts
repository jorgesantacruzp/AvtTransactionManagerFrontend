import {Transaction} from "./transaction.model";
import {EventEmitter} from "@angular/core";

export class TransactionsService {
  transactionsChanged = new EventEmitter<void>();

  transactions: Transaction[] = [
  ];

  getTransactions() {
    return this.transactions.slice();
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    this.transactionsChanged.emit();
  }

  addTransactions(transactions: Transaction[]) {
    // spread operator (...) converts an array into a list
    this.transactions.push(...transactions);
  }

  deleteTransaction(id: string) {
    this.transactions = this.transactions.filter(t => t.name !== id);
    this.transactionsChanged.emit();
  }

}
