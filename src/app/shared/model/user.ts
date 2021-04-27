export class User {
  constructor(
    public entity: string,
    public groups: Array<string>,
    public roles: Array<string>,
    public subject: string
  ) {
  }
}
