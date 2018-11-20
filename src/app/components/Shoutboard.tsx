import * as React from 'react'
import { observer, inject, Provider } from 'mobx-react'
import { Nav } from 'app/components/Nav'
import { Button } from '@material-ui/core'
import { observable, autorun, action } from 'mobx'
import { routeState } from 'app/routeState'
import TextareaAutosize from 'react-autosize-textarea';
import {TextField, Typography} from '@material-ui/core';
import {PostsStore} from './PostsStore';


/**
 * Shoutboard should consist of:
 *  - form for submitting new message (name, email, message and submit button) with validation
 *  - list of submitted messages ordered descending by creation date (newest first)
 * 
 * Any message submitted via form will be displayed in list of messages below.
 * 
 * Try to:
 *  - Use material design components (https://material-ui.com/getting-started/usage/)
 *      - For example: TextField, Button, Typography, ...
 *  - For styling use tailwind css classes (https://tailwindcss.com/docs/what-is-tailwind)
 *      - margins (m-0, mt-2, mx-4, ...)
 *      - flexbox (flex, flex-row-reverse, ...)
 */

//action.bound
@observer
export class Shoutboard extends React.Component<{}, {}> {
    constructor(props: any){
        super(props)
    }

  postsStore = new PostsStore()
  @observable counter: number = 0

  @observable isVisible = false

  @action.bound private toggleComponent() {
    //console.log(this.visible)
    this.isVisible = !this.isVisible
  }



    render() {
        return (
          <Provider posts={this.postsStore}>
          	<div className="h-screen flex flex-col">
                  <div className="flex-none">
  	                <Nav />
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
  	                <h1 className="text-center">Shoutboard will be here</h1>
                      <Button className="bg-grey-light" onClick={this.toggleComponent}> Create Post </Button>
                      <hr/>
                      {this.isVisible && <CreatePost postsStore={this.postsStore}/>}
                      {this.postsStore.posts.map((item) => {
                          return(
                          <div className="container pb-2 lg:flex" key={item.id}>
                              <div className="w-full border border-grey-light lg:border-b lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                  <Typography variant="title">{item.name}</Typography>
                                  <Typography>{item.text}</Typography>
                              </div>
                          </div>
                          )
                      })}
                </div>
            </div>
          </Provider>
        )
    }
}



class Post {
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

@inject('posts')
@observer
class CreatePost extends React.Component<{ postsStore?: PostsStore }, {}> { 

    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
        //this.onChange = this.onChange.bind(this)
    }

    @observable counter = 0
    @observable error : string | null = null
    @observable errortext: string | null = null


    @observable post : Post = new Post("", "")

    @action.bound private handleUserInput(event, key : keyof Post){
        const target = event.target;
        this.post[key] = target.value
    }

/*   onChange(event){
        this.handleUserInput(event.target.name, event.target.value);
    }*/

    private validateNameInput(str: string) : boolean{
      const regex = new RegExp("^[a-zA-z ]{3,15}$")
      return regex.test(str)
    }

    private validateTextInput(str : string) : boolean{
      const regex = /^[a-zA-z ].{3,1000}\d*$/
      return regex.test(str)
    }


    private onClick(event, post : Post){
        event.preventDefault()
        if(!this.validateNameInput(post.name)){
            this.error = "Please enter username in english and without numbers and max 15 letters"
            //alert("Please enter username in english and without numbers and max 15 letters")
            return
          }
        if(!this.validateTextInput(post.text)){
              this.errortext = "Please use english letters and 1000 symbols max"
              return
        }
        console.log(`Adding post ${JSON.stringify(post)}`)
        this.props.postsStore!.addPost(post)
        this.post = new Post("", "")
        this.error = null
        this.errortext = null
    }
    render(){
      const post = this.post

        return (
          <form  onSubmit={(event) => this.onClick(event, this.post)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Create post
            </label>
            <TextField 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
                value={post.name} 
                error={this.error != null}
                onChange={(event) => this.handleUserInput(event, "name")}
                helperText={this.error || ""}
                placeholder={this.error || "Enter name"} required
            />
            <hr />
              <TextField type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                value={post.text} 
                onChange={(event) => this.handleUserInput(event, "text")}
                error={this.errortext != null}
                helperText={this.errortext || ""} 
                multiline={true}
                placeholder="Enter text" required
              />
            <br />
            <input type="submit" value="Submit" className='bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'/>
          </form>
        );
    }
}