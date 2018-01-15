import { Injectable } from '@angular/core';
import { IAuthor } from "../../../dataModel/Author";

@Injectable()
export class RaceServiceService {

  private author: IAuthor;
  constructor() { }

  list() {
      console.log("");
  }

}
