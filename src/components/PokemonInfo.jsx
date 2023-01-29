import { Component } from 'react';
//import { toast } from 'react-toastify';

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      console.log('Змінилось ім`я покемона');
      this.setState({ loading: true, pokemon: null });
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`не існує покемона ${nextName}`));
        })
        .then(pokemon => this.setState({ pokemon }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { loading, pokemon, error } = this.state;
    const { pokemonName } = this.props;
    return (
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
    );
  }
}
