import { observable, action } from 'mobx'
import { Post } from './Post'

export class PostsStore {

  @observable posts = new Array<Post>()

  @action addPost(post: Post){
    this.posts.unshift(post)
  }
}
