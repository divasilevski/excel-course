import { Loader } from '../../components/Loader'
import { $ } from '../dom'
import { ActiveRoute } from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in router')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.loader = new Loader()

    this.changePageHandler = this.changePageHandler.bind(
      this
    )
    this.page = null

    this.init()
  }

  init() {
    window.addEventListener(
      'hashchange',
      this.changePageHandler
    )
    this.changePageHandler()
  }

  async changePageHandler(event) {
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder.clear().append(this.loader)

    const path = ActiveRoute.path.split('/')[0]

    const index = this.routes.findIndex(
      (route) => route.path === path
    )

    if (index !== -1) {
      const Page = this.routes[index].page
      this.page = new Page(ActiveRoute.param)
    } else {
      const Err = this.routes.find((route) =>
        Object.keys(route).includes('error')
      ).error
      this.page = new Err()
    }

    const root = await this.page.getRoot()

    this.$placeholder.clear().append(root)
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener(
      'hashchange',
      this.changePageHandler
    )
  }
}
