import * as React from 'react'
import { observer } from 'mobx-react'
import { routeState } from 'app/routeState'
import { link } from 'takeme'
import { links } from 'app/links'
import { AppBar, Toolbar, Button } from '@material-ui/core'

@observer
export class Nav extends React.Component {
  render() {
    return <AppBar position="static" color="primary">
      <Toolbar>
        {routeState.loggedIn && <div>
          <Button className='mr-2' color='default' variant='outlined' href={link(links.profile('dave'))}>Dave</Button>
          <Button className='mr-2' color='default' variant='outlined' href={link(links.profile('john'))}>John</Button>
          <Button className='mr-2' color='secondary' variant='outlined' href={link(links.posts())}>Posts</Button>
          <Button className='mr-2' color='secondary' variant='outlined' href={link(links.shoutboard())}>Shoutboard</Button>
        </div>}
        <div className='flex-grow' />
        {routeState.loggedIn && <Button
          variant='raised'
          color='secondary'
          onClick={() => routeState.logout()}>Logout</Button>
        }
        {!routeState.loggedIn && <Button
          variant='raised'
          color='secondary'
          onClick={() => routeState.login()}>Login</Button>
        }
      </Toolbar>
    </AppBar>
  }
}
