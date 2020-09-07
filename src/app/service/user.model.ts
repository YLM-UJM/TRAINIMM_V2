export class User {
  constructor(
    public user_id: string,
    public nom: string,
    public prenom: string,
    private _token: string,
    private expiration: Date

  ) {}

  get token() {
    if (!this.expiration || this.expiration <= new Date()) {
      return null;
    }
    return this._token;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    return this.expiration.getTime() - new Date().getTime();
  }

}
