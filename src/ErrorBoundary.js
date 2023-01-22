import { Component } from 'react'
import classes from './ErrorBoundary.module.css'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className={`center ${classes.content}`}>
          <h1>Something went wrong</h1>
        </div>
      )
    }
    return this.props.children
  }
}
