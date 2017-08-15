import React, { Component } from 'react';
import { APIconnect } from './api-contract';

class ChildComp extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    this.props.getUsers.fetch().then((data) => {
      this.setState({
        list: data.list,
      })
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.addUser.fetch({
      body:{
        name: 'tony',
        age: 26,
        department: 'CTO',
      }
    }).then((data) => {
      this.props.getUsers.fetch().then((data) => {
        this.setState({
          list: data.list,
        })
      })
    })
  }

  render(){
    return (<div>
      <table>
      <thead>
      <tr>
        <th>id</th><th>name</th><th>age</th><th>department</th><th>entitle</th>
      </tr>
      </thead>
      <tbody>
        {this.state.list.map((item) => (<tr>{Object.keys(item).map((key)=> (<td>{item[key]}</td>))}</tr>))}
      </tbody>
      </table>
      <button onClick={this.handleClick}>click me!</button>
    </div>);
  }
}
const mapAPIToProps = (api) => {
  return {
    getUsers: api.getUsers,
    addUser:  api.addUser,
  }
}
export default APIconnect(mapAPIToProps)(ChildComp);