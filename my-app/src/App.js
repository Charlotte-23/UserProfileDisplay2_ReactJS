import React, { Component } from 'react'
import { Row, Col } from 'antd';
import axios from 'axios';
import './App.css';
import User from './User';

class App extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  deleteUser = (id) => {
    this.setState((prevState) => ({
      persons: prevState.persons.filter(x => x.id != id)
    }), () =>{
      console.log(this.state.persons)
    });
  };

  updateInfo = (id, data) => {
    this.setState((prevState) => ({
      persons: prevState.persons.map((x) => {
        if (id == x.id) {
          x.name = data.name;
          x.email = data.email;
          x.phone = data.phone;
          x.website = data.website;
        }
        return x;
      })
    }));
  };

  render() {
    if (this.state.persons.length == 0) {
      return (
        <div>
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Row>
          {this.state.persons.map((user) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} >
              <div key={this.state.persons.username}>
                <User user={user} deleteUser={this.deleteUser} updateInfo={this.updateInfo} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default App