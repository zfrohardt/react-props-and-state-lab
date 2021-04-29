import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeFilter} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  fetchPets = () => {
    let endpoint = '/api/pets';
    let filter = this.state.filters.type;
    if (filter !== 'all') {
      endpoint = `${endpoint}?type=${filter}`;
    }
    fetch(endpoint).then(resp => resp.json())
    .then(pets => this.setState({
      pets: pets,
    }));
  }

  changeFilter = filter => {
    this.setState({
      filters: {
        type: filter
      }
    });
  }

  adoptPet = petId => {
    this.setState({
      pets: this.state.pets.map(pet => {
        if (pet.id === petId) {
          pet.isAdopted = true;
        }
        return pet;
      })
    })
  }
}
export default App
