import { observable } from 'mobx'

export class Post {
  static counter = 0

  public id: number

  @observable
  public name: string

  @observable
  public text: string

  constructor(name: string, text: string) {
    this.id = Post.counter++
    this.name = name
    this.text = text
  }

}