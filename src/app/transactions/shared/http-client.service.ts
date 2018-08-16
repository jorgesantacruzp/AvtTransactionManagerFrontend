import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Transaction} from "../transaction.model";

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient) {
  }

  saveTransaction(transaction: Transaction) {
    return this.http.post('http://localhost:8080/v1/transactions/', transaction);
  }

  deleteTransaction(idTransaction: string) {
    return this.http.delete('http://localhost:8080/v1/transactions/' + idTransaction);
  }

  getTransactions(weight: number, typeId: string) {
    if (weight > 0 && typeId !== "-1") {
      return this.http.get('http://localhost:8080/v1/transactions/' + weight + '?type=' + typeId)
        .pipe(map(transactions => {
          return transactions;
        }))
    } else if (weight > 0) {
      return this.http.get('http://localhost:8080/v1/transactions/' + weight)
        .pipe(map(transactions => {
          return transactions;
        }))
    } else if (typeId !== "-1") {
      return this.http.get('http://localhost:8080/v1/transactions?type=' + typeId)
        .pipe(map(transactions => {
          return transactions;
        }))
    } else {
      return this.http.get('http://localhost:8080/v1/transactions')
        .pipe(map(transactions => {
          return transactions;
        }))
    }
  }

  changeRepository(repository: string) {
    return this.http.post('http://localhost:8080/v1/repositories/' + repository);
  }
}
