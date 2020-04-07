import React from 'react';
import PokemonList from './components/PokemonList';
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => <>
    <PokemonList url={URL_PATH} />
</>;

export default App;
