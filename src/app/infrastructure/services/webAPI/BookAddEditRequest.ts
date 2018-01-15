import { IAuthor } from "./../../../dataModel/Author";

export interface IBookAddEditRequest {
    
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