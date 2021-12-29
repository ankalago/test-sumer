export class Todo {
  id: number;
  name: string;
  status: boolean;

  constructor(
    id: number,
    name: string,
    status: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
