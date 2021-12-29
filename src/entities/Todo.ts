export class Todo {
  _id: number;
  description: string;
  completed: boolean;

  constructor(
    id: number,
    name: string,
    status: boolean = false
  ) {
    this._id = id;
    this.description = name;
    this.completed = status;
  }
}
