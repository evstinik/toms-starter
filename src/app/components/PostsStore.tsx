import { observable, action } from 'mobx'


export class PostsStore {
	@observable posts = new Array()

	@action addPost(post: object){
    	this.posts.unshift(post)
  	}
}