import {Component} from '@angular/core';

export interface TransactionElement {
  id: string;
  name: string;
  weight: number;
  type: string;
  createdDate: string;
}

const ELEMENT_DATA: TransactionElement[] = [
  {id: "1", name: 'Hydrogen', weight: 1, type: 'CHECK_CHANGE', createdDate: 'now'},
  {id: "2", name: 'Helium', weight: 4, type: 'MONEY_TRANSFER', createdDate: 'now'},
  {id: "3", name: 'Lithium', weight: 6, type: 'PAYROLL_PAYMENT', createdDate: 'now'}
];

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionListComponent {
  displayedColumns: string[] = ['name', 'weight', 'date', 'delete'];
  dataSource = ELEMENT_DATA;

  deleteTransaction(id: string) {
    alert(id);
  }

}
