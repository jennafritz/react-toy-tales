import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toysArray => this.setState({toys: toysArray}))
  }

  createNewToy = (createdToy) => {
    this.setState({
      toys: [createdToy, ...this.state.toys]
    })
  }

  deleteToy = (toyObj) => {
    let keptToys = this.state.toys.filter((toy) => toy.id !== toyObj.id)

    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => this.setState({
        toys: keptToys
      }))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  likeToy = (toyObj) => {
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: toyObj.likes + 1
      })
    })
    .then(res => res.json())
    .then(updatedToy => {
        let oldIndex = this.state.toys.indexOf(toyObj)
        this.state.toys.splice(oldIndex, 1, updatedToy)
        this.setState({
          toys: this.state.toys
        })
      })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createNewToy={this.createNewToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} likeToy={this.likeToy}/>
      </>
    );
  }

}

export default App;
