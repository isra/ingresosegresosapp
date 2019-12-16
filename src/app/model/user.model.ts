export class User {
  public uid: string;
  public name: string;
  public email: string;

  constructor(user: IUsuario) {
    this.uid = (user && user.uid) || null;
    this.name = (user && user.name) || null;
    this.email = (user && user.email) || null;
  }
}

interface IUsuario {
  uid: string;
  name: string;
  email: string;
}
