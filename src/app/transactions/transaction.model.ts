export class Transaction {
  public id: string;
  public name: string;
  public weight: number;
  public type: string;
  public createdDate: string;
  public dataStructure: string;

  constructor(name: string,
              weight: number,
              type: string,
              dataStructure: string) {
    this.name = name;
    this.weight = weight;
    this.type = type;
    this.dataStructure = dataStructure;
  }

  constructor(name: string,
              weight: number,
              type: string) {
    this.name = name;
    this.weight = weight;
    this.type = type;
  }
}
