import React, { Component } from 'react';
import '../App.css';
//import PokemonSearch from './PokemonSearch'

class PokemonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            pokemonList: null,
            pokemonSearchValue: ''
        };

        this.processResponse = this.processResponse.bind(this);
        this.renderPokemonList = this.renderPokemonList.bind(this);
        this.renderPokemon = this.renderPokemon.bind(this);
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url)
            .then((response) => (response.json()))
            .then(this.processResponse, this.reportError);
    }

    render() {
        return (this.state.isLoading) ?
            this.renderLoading() :
            this.renderPokemonList();
    }

    renderLoading() {
        return <div className="loader"></div>;
    }

    renderPokemonList() {
        const { pokemonList, pokemonSearchValue:searchValue } = this.state;
        let filteredList;

        filteredList = pokemonList.filter(({ Name:name, Types:types }) => {
            const formattedSearchValue = searchValue.toLowerCase();

            return (
                name.toLowerCase().includes(formattedSearchValue) ||
                types.join(' ').toLowerCase().includes(formattedSearchValue)
            );
        })
        .slice(0, 4)
        .sort();

        return (
            <div>
                <div>
                    <input type="checkbox" id="maxCP" /> Maximum Combat Points
                    <input type="text" onChange={this.filterList} placeholder="Pokemon or type" />
                </div>
                <ul className="suggestions">
                    {filteredList.map(this.renderPokemon)}
                </ul>
            </div>
        );
    }

    renderPokemon(pokemon, key) {
        const { Name:name, Types:types, Number:number } = pokemon;
        const image = `http://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`;

        return (
            <li key={key}>
                <img src={image} alt="" />
                <div className="info">
                    <h1>{name}</h1>
                    {types.forEach((type) => {
                        const className = `type ${type}`;

                    return <span className={className}>{type}</span>
                    })}
                </div>
            </li>
        );
    }

    processResponse(pokemonList) {
        this.setState({
            isLoading: false,
            pokemonList: pokemonList
        });
    }

    reportError(error) {
        console.log('ERROR: ', error);
    }

    filterList(event) {
        const searchValue = event.target.value;

        this.setState({
            pokemonSearchValue: searchValue
        });
    }
}

export default PokemonList;