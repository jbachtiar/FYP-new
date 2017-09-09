import { Collection } from "../model/collection"
import { Tag } from "../model/tag"

export class Pattern { 
    public patternId : number;
    public patternName : string;
    public patternDesc : string;
    public patternPrice : number;
    public collection : Collection;
    public tags : Tag[] ;
}