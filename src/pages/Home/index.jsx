
import React, { Component } from 'react'
import store from '@/store'
import { loggedUserAction } from '@/store/actions'
import { connect } from 'react-redux'
// console.log(store.getState())
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		return (
			<h1 onClick={this.props.add}> Home --- {this.props.name}</h1>
		)
	}
}
const stateToProps = (state) => ({ name: state.loggedUser.name })
const dispatchToProps = () => (dispatch) => ({
	add() {
		dispatch(loggedUserAction({ name: 'zhangsan' }))
	}
})
export default connect(stateToProps, dispatchToProps)(Home)
