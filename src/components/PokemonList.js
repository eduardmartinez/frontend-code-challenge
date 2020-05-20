import React, { Component } from 'react';
import Utils from '../libraries/utils';
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
        const { pokemonList, pokemonSearchValue:searchValue } = Utils.clone(this.state);
        let filteredList = [], filteredContent;

        filteredList = pokemonList.filter(({ Name:name, Types:types }) => {
            const formattedSearchValue = searchValue.toLowerCase();

            return (
                name.toLowerCase().includes(formattedSearchValue) ||
                types.join(' ').toLowerCase().includes(formattedSearchValue)
            );
        })
        .slice(0, 4)
        .sort();

        filteredContent = (filteredList.length === 0) ?
            this.renderNoContent() :
            filteredList.map(this.renderPokemon);

        return (
            <div>
                <div>
                    <label htmlFor="maxCP" className="max-cp">
                        <input type="checkbox" id="maxCP" />
                        <small>
                            Maximum Combat Points
                        </small>
                    </label>
                    <input type="text" onChange={this.filterList} placeholder="Pokemon or type" />
                </div>
                <ul className="suggestions">
                    {filteredContent}
                </ul>
            </div>
        );
    }

    renderNoContent() {
        return (
            <li>
                <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
                <div className="info">
                    <h1 className="no-results">
                        No results
                    </h1>
                </div>
            </li>
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
                    {types.map((type, key) => {
                        const className = `type ${type}`;

                        return <span key={key} className={className}>{type}</span>;
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