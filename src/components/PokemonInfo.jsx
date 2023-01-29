import { Component } from 'react';
import PokemonDataView from './PokemonDataView';
//import { toast } from 'react-toastify';

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,

    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      console.log('Змінилось ім`я покемона');
      this.setState({ status: 'pending' });
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`не існує покемона ${nextName}`));
        })
        .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { pokemon, error, status } = this.state;
    //const { pokemonName } = this.props;

    if (status === 'idle') {
      return <div>введіть ім`я покемона</div>;
    }

    if (status === 'pending') {
      return <div>loading...</div>;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />;
    }
    /*return (
      <div>
        {error && <div>{error.message}</div>}
        {loading && <div>loading...</div>}
        {!pokemonName && <div>введіть ім`я покемона</div>}
        {pokemon && (
          <div>
            <p>{pokemon.name}</p>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              width="240"
            />
          </div>
        )}
      </div>
    );*/
  }
}
