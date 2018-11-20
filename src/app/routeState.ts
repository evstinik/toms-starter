import { observable, action } from 'mobx'
import { navigate } from 'takeme'
import { links } from 'app/links'

export type Route = keyof typeof links

export class RouteState {
  @observable route: Route = 'login'

  @observable posts = new Array()

  /*@observable post = {
    name: "",
    text: ""
  }*/


  @action setRoute(route: Route) {
    this.route = route
  }

  @observable loggedIn = true
  @observable loginRequiredMessage: string = ''
  @action setLoginRequiredMessage(message: string) {
    this.loginRequiredMessage = message
  }

  @action addPost(post: object){
    this.posts.unshift(post)
  }


  @action login() {
    this.loggedIn = true
    this.loginRequiredMessage = ''
  }
  @action logout() {
    this.loggedIn = false
    navigate(links.login())
  }

  @observable visible = false
  @action showComponent(showComponent : boolean) {
    //console.log(this.visible)
    this.visible = showComponent
  }



  @observable profileId: string = ''
  @action setProfile(profileId: string) {
    this.profileId = profileId
  }
}

export const routeState = new RouteState()