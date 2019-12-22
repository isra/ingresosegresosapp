export class IngresoEgresoModel {
  uid: string;
  description: string;
  amount: number;
  type: string;

  constructor(data: any) {
    this.description = (data && data.description) || null;
    this.amount = (data && data.amount) || null;
    this.type = (data && data.type) || null;
    // this.uid = (data && data.uid) || null;
  }
}

/* interface IIngresoEgreso {
  uid?: string;
  description: string;
  amount: number;
  type: string;
} */
