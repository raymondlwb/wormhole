/*-
 * <<
 * wormhole
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import React from 'react'
import Helmet from 'react-helmet'

import request from '../../utils/request'
import Navigator from '../../components/Navigator'

export class App extends React.Component {
  componentWillMount () {
    this.checkLogin()
  }

  checkLogin = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      this.props.router.push('/login')
    } else {
      request.setToken(token)
    }
  }

  render () {
    const { router, params, children } = this.props

    const navOrNot = localStorage.getItem('token')
      ? (
        <Navigator
          router={router}
          params={params}
        />
      )
      : ''

    return (
      <div>
        <Helmet
          titleTemplate="%s - Wormhole Rider"
          defaultTitle="Wormhole Rider"
          meta={[
            { name: 'description', content: 'Wormhole Rider Web Application' }
          ]}
        />
        {navOrNot}
        <div className="ri-main">
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.any,
  params: React.PropTypes.any
}

export default App
