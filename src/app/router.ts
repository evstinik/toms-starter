import { Router } from 'takeme'
import { routeState } from 'app/routeState'
import { links } from 'app/links'

export const router = new Router([
  {
    $: links.login(),
    enter: () => routeState.setRoute('login')
  },
  {
    $: links.posts(),
    enter: () => routeState.setRoute('posts')
  },
  {
    $: links.shoutboard(),
    enter: () => routeState.setRoute('shoutboard')
  },
  {
    $: links.profile(':profileId'),
    enter: ({ params: { profileId } }) => {
      routeState.setRoute('profile')
      routeState.setProfile(profileId)
    },
    beforeEnter: () => {
      if (!routeState.loggedIn) {
        routeState.setLoginRequiredMessage('You need to login before you can visit a profile page')
        return { redirect: links.login() }
      }
      return null
    },
  },
  { $: '*', enter: () => routeState.setRoute('login') },
])