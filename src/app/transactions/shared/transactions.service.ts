import {Transaction} from "../transaction.model";
import {EventEmitter, Injectable} from "@angular/core";
import {HttpClientService} from "./http-client.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class TransactionsService {
  transactionsChanged = new EventEmitter<void>();
  transactionsFiltered = new EventEmitter<Transaction[]>();
  errorHappened = new EventEmitter<string>();

  transactions: Transaction[] = [];
  allTransactions: Transaction[] = [];
  searchedWeight: number;
  searchedType: string = "-1";

  constructor(private httpClientService: HttpClientService) {

  }

  getTransactionsFromServer(weight: number, typeId: string) {
    this.httpClientService.getTransactions(weight, typeId)
      .subscribe(
        (transactions: any[]) => {
          if (!(weight > 0) && typeId == "-1") {
            this.allTransactions = transactions;
          }
          this.transactions = transactions;
          this.transactionsFiltered.emit(transactions);
          this.transactionsChanged.emit();
        },
        (error: HttpErrorResponse) => {
          this.errorHappened.emit(error.error.message != null ? error.error.message : 'Problems while fetching transactions');
        }
      );
  }

  getTransactionsByWeightAndTypeFromServer(weight: number, typeId: string) {
    this.searchedWeight = weight;
    this.searchedType = typeId;
    this.getTransactionsFromServer(weight, typeId);
  }

  getTransactions() {
    return this.transactions.slice();
  }

  addTransaction(transaction: Transaction) {
    return this.httpClientService.saveTransaction(transaction);
  }

  deleteTransaction(id: string) {
    return this.httpClientService.deleteTransaction(id);
  }

  changeRepository(repository: string) {
    return this.httpClientService.changeRepository(repository);
  }

  deleteTransactionsInMemory() {
    return this.httpClientService.deleteTransactionsInMemory();
  }
}
