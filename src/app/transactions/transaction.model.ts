export class Transaction {
  public id: string;
  public name: string;
  public weight: number;
  public type: string;
  public createdDate: string;

  constructor(id: string,
              name: string,
              weight: number,
              type: string,
              createdDate: string) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.type = type;
    this.createdDate = createdDate;
  }
}
