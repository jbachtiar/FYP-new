import { Component } from '@angular/core';
import {PostsService} from '../services/post.service';


@Component({
  moduleId: module.id,  /** for relative path */
  selector: 'user',
  templateUrl: 'user.components.html',
  providers: [PostsService]
})
export class UserComponent  { 
    name: string;
    email: string;
    address: address;
    hobbies: string[];
    showHobby: boolean;
    posts: Post[];

    constructor(private postsService: PostsService){

        this.name = 'Cheer'; 
        this.email="haah@hotmail.com";
        this.address={
            street:'hahaha',
            city:'city',
            state:'state'

        }
        this.hobbies=['music','sports'];
        this.showHobby=false;
        this.postsService.getPost().subscribe(posts => {
            this.posts= posts;
        }) ;
    }

    toggleHobby(){
        if(this.showHobby==true){
            this.showHobby=false;


        }else{
            this.showHobby=true;
        }

    
    }

    addHobby(hobby: string){
        this.hobbies.push(hobby);


    }

    deleteHobby(i: number){
        this.hobbies.splice(i,1);
    }

}

interface address {
    street: string,
    city: string 
    state: string 


}

interface Post{
    id: number;
    title:string;
    body: string;


}




