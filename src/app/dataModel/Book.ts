import { IAuthor } from "./Author";

export interface IBook{
    /**
    * 
    */
    id: number;
    /**
    * 
    */
    title?: string;
    /**
    * 
    */
    authorId?: number;
    /**
    * 
    */
    author?: IAuthor;
    /**
    * 
    */
    page_no?: number;
    /**
    * 
    */
    lang?: string;
    /**
    * 
    */
    gendre?: string;
    /**
    * 
    */
    lit?: string;
    /**
    * 
    */
    copies_no?: number;
}
