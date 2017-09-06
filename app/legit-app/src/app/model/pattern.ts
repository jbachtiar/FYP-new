import { Collection } from "../model/collection"
import { Tag } from "../model/tag"

export class Pattern { 
    private patternId : number;
    private patternName : string;
    private patternDesc : string;
    private patternPrice : number;
    private collection : Collection;
    private tags : Tag[] ;
}