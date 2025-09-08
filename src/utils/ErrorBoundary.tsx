import React from 'react'

type State = { hasError: boolean }

export default class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}){
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(){ return { hasError: true } }
  componentDidCatch(error: any, info: any){ console.error('App crash', error, info) }
  render(){
    if(this.state.hasError) return <div style={{padding:20}}>Something went wrong — refresh or contact the dev.</div>
    return this.props.children
  }
}
