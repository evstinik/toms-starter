import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Nav } from 'app/components/Nav'
import { Button } from '@material-ui/core'
import { observable, autorun } from 'mobx'
import { routeState } from 'app/routeState'
import TextareaAutosize from 'react-autosize-textarea';
import TextField from '@material-ui/core/TextField';





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




@observer
export class Shoutboard extends React.Component<{}, {}> {
    constructor(props: any){
        super(props)
        this._onClickHandler = this._onClickHandler.bind(this)
    }

    @observable counter: number = 0


    _onClickHandler() {
        if(!routeState.visible){
            //console.log(true)
            routeState.showComponent(true)
        }
        else{
            //console.log(false)
            routeState.showComponent(false)
        }
    }

    render() {
        return (
        	<div className="h-screen flex flex-col">
                <div className="flex-none">
	                <Nav />
                </div>
                <div className="flex-1 overflow-y-auto p-4">
	                <h1 className="text-center">Shoutboard will be here</h1>
                    <Button className="bg-grey-light" onClick={() => this._onClickHandler()}> Create Post </Button>
                    <hr/>
                    {routeState.visible && <CreatePost/>}
                    {routeState.posts.map((item) => {
                        return <div className="container pb-2 lg:flex" key={item._id}>
                            <div className="w-full border border-grey-light lg:border-b lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <h2>{item.name}</h2>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    })}
                </div>
                
            </div>

        )
    }
}

@observer
class CreatePost extends React.Component<{}, {}> { 

    constructor(props){
        super(props)
        this.handleUserInput = this.handleUserInput.bind(this)
        this.onClick = this.onClick.bind(this)
        //this.onChange = this.onChange.bind(this)
        autorun(() => console.log(`New post value: ${JSON.stringify(routeState.posts)}`))
    }

    @observable counter = 0
    @observable error : string | null = null

    @observable post = {
        _id:`${this.counter++}`,
        name: "",
        text: ""
    }



    handleUserInput(event, key){
        const target = event.target;
        this.post[key] = target.value
    }

/*   onChange(event){
        this.handleUserInput(event.target.name, event.target.value);
    }*/


    onClick(event, post){
        const regex = new RegExp("^[a-zA-z ]{3,15}$")
        console.log(`Adding post ${JSON.stringify(post)}`)
        if(regex.test(post.name)){
            routeState.addPost(post)
            this.post = {
                _id:`${this.counter++}`,
                name: "",
                text: ""
            }
            this.error = null
        }else{
            this.error = "Please enter username in english and without numbers and max 15 letters"
            //alert("Please enter username in english and without numbers and max 15 letters")
        }

        event.stopPropagation()
        
    }

    render(){
        return (
          <form  onSubmit={(event) => this.onClick(event, this.post)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Create post
            </label>
            <TextField 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
                value={this.post.name} 
                error={this.error != null}
                onChange={(event) => this.handleUserInput(event, "name")}
                helperText={this.error || ""}
                placeholder={this.error || "Enter name"} required
            />
            <hr />
              <TextareaAutosize type="text" className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                value={this.post.text} 
                onChange={(event) => this.handleUserInput(event, "text")} 
                placeholder="Enter text" required
              />
            <br />
          <br />
          <input type="submit" value="Submit" className='bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'/>
          </form>
        );
    }
}