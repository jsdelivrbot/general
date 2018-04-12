import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestApiData } from '../actions'

class App extends Component {
  componentDidMount () {
    this.props.requestApiData()
  }

  render () {
    const { results = [] } = this.props.data || []

    if (results && results.length) {
      console.log(this.props.data)
    }
    return (
      <div>React simple starter</div>
    )
  }
}

const mapStateToProps = state => ({ data: state.data })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
