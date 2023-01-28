import { Component } from 'react';

export class App extends Component {
  state = {
    pokemon: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(res => res.json())
      .then(pokemon => this.setState({ pokemon }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div
        style={{
          maxWidth: 1170,
          margin: '0 auto',
          padding: 20,
        }}
      >
        {this.state.loading && <h1> загружається...</h1>}
        {this.state.pokemon && <div> {this.state.pokemon.name}</div>}
      </div>
    );
  }
}
