import {Transaction} from "./transaction.model";
import {EventEmitter} from "@angular/core";

export class TransactionsService {
  transactionsChanged = new EventEmitter<void>();

  transactions: Transaction[] = [
    {id: "1", name: 'Check chanege transaction sample', weight: 1, type: 'CHECK_CHANGE', createdDate: '2018/08/13', dataStructure: 'BINARY_TREE'},
    {id: "2", name: 'Money transfer transaction sample', weight: 4, type: 'MONEY_TRANSFER', createdDate: '2018/08/13', dataStructure: 'BINARY_TREE'},
    {id: "3", name: 'Payroll payment transaction sample', weight: 6, type: 'PAYROLL_PAYMENT', createdDate: '2018/08/13', dataStructure: 'BINARY_TREE'}
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
