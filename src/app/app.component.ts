import {Component, OnInit} from '@angular/core';
import {Transaction} from "./transactions/transaction.model";

const ELEMENT_DATA: Transaction[] = [
  {id: "1", name: 'Check chanege transaction sample', weight: 1, type: 'CHECK_CHANGE', createdDate: '2018/08/13'},
  {id: "2", name: 'Money transfer transaction sample', weight: 4, type: 'MONEY_TRANSFER', createdDate: '2018/08/13'},
  {id: "3", name: 'Payroll payment transaction sample', weight: 6, type: 'PAYROLL_PAYMENT', createdDate: '2018/08/13'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // get all transactions
  }

  dataSourceCheckChange = ELEMENT_DATA.filter(t => t.type === 'CHECK_CHANGE');
  dataSourceMoneyTransfer = ELEMENT_DATA.filter(t => t.type === 'MONEY_TRANSFER');
  dataSourcePayrollPayment = ELEMENT_DATA.filter(t => t.type === 'PAYROLL_PAYMENT');
}
