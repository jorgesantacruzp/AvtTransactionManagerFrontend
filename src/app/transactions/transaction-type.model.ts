export interface TransactionType {
  id: string;
  name: string;
  code: string;
}

export const transactionTypes: TransactionType[] = [
  {id: "-1", name: 'All', code: 'ALL'},
  {id: "1", name: 'Check change', code: 'CHECK_CHANGE'},
  {id: "2", name: 'Money transfer', code: 'MONEY_TRANSFER'},
  {id: "3", name: 'Payroll payment', code: 'PAYROLL_PAYMENT'}
];
