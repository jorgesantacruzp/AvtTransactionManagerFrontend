import {Component, OnInit} from '@angular/core';
import {Transaction} from "./transactions/transaction.model";

const ELEMENT_DATA: Transaction[] = [
  {id: "1", name: 'Hydrogen', weight: 1, type: 'CHECK_CHANGE', createdDate: 'now'},
  {id: "2", name: 'Helium', weight: 4, type: 'MONEY_TRANSFER', createdDate: 'now'},
  {id: "3", name: 'Lithium', weight: 6, type: 'PAYROLL_PAYMENT', createdDate: 'now'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Avantica transaction Manager';

  ngOnInit(): void {
    // get all transactions
  }

  dataSourceCheckChange = ELEMENT_DATA.filter(t => t.type === 'CHECK_CHANGE');
  dataSourceMoneyTransfer = ELEMENT_DATA.filter(t => t.type === 'MONEY_TRANSFER');
  dataSourcePayrollPayment = ELEMENT_DATA.filter(t => t.type === 'PAYROLL_PAYMENT');
}
