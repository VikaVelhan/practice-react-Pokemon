import { Component } from 'react';

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pokemonName !== this.props.pokemonName) {
      console.log('Змінилось ім`я покемона');

      fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
        .then(res => res.json())
        .then(pokemon => this.setState({ pokemon }));
    }
  }

  render() {
    return (
      <div>
        {this.state.loading && <div>loading...</div>}
        {!this.props.pokemonName && <div>введіть ім`я покемона</div>}
        {this.state.pokemon && <div>{this.state.pokemon.name}</div>}
      </div>
    );
  }
}
