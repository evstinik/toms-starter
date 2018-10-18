import * as React from 'react'
import { observer } from 'mobx-react'
import { Profile } from 'app/components/Profile'
import { Login } from 'app/components/Login'
import { routeState } from 'app/routeState'
import { Posts } from 'app/components/Posts'
import { Shoutboard } from './components/Shoutboard';

/**
 * Application State -> Page
 */
// export const Pages = observer(() => {
@observer
export class Pages extends React.Component {
  render() {
    switch (routeState.route) {
      case 'login': return <Login />;
      case 'posts': return <Posts />;
      case 'profile': return <Profile profileId={routeState.profileId} />;
      case 'shoutboard': return <Shoutboard />;
      default:
        return <h1>404</h1>
    }
  }
}
