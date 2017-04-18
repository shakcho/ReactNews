import React, { Component } from 'react';
import Search from './search';
import Table from './table';
import logo from './logo.svg';
import './App.css';

const data = 'News';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			result: null,
			searchTerm: DEFAULT_QUERY,
		};
		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.setSearchTopstories = this.setSearchTopstories.bind(this);
		this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
	}
	onDismiss(id) {
		const isNotId = item => item.objectID !== id;
		const updatedHits = this.state.result.hits.filter(isNotId);
		this.setState({
			//ES5 Object.assign
			//result: Object.assign({}, this.state.result, { hits: updatedHits })
			
			// Spread Operator use case 
			result: { ...this.state.result, hits: updatedHits }
		});
	}
	onSearchChange(){
		this.setState({ searchTerm: event.target.value });
	}
	fetchSearchTopstories(searchTerm){
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
		.then(response => response.json())
		.then(result => this.setSearchTopstories(result));
	}
	setSearchTopstories(result) {
		this.setState({ result });
	}
	componentDidMount(searchTerm) {
		//const { searchTerm } = this.state;
		this.fetchSearchTopstories(this.state.searchTerm);
	}

  	render() {
  		const { searchTerm, result } = this.state;
		if (!result) { return null; }
	    return (
	      <div className="App">
	        <div className="App-header">
	          <img src={logo} className="App-logo" alt="logo" />
	          <h2>Welcome to React { data }</h2>
	          <Search
					value={searchTerm}
					onChange={this.onSearchChange}>
					Search
			  </Search>
	        </div>
	        <div className="container">
	          	{ result
					? <Table
						list={result.hits}
						pattern={searchTerm}
						onDismiss={this.onDismiss}
					/>
					: null
				}
	        </div>
	      </div>
	    );
  	}
}


if (module.hot) {
module.hot.accept()
}
export default App;
