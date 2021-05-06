export class AccessGroup {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public iamGroupName: string,
    public enabled: boolean
  ) {
  }
}
