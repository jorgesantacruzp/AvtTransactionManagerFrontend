import {Component, Input} from '@angular/core';
import {Transaction} from "../transaction.model";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionListComponent {
  displayedColumns: string[] = ['name', 'weight', 'date', 'delete'];
  @Input('dataSourceInput') dataSource: Transaction[];

  deleteTransaction(id: string) {
    alert(id);
  }
}
