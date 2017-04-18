import React, { Component } from 'react';
import Search from './search';
import Button from './button';
import Table from './table';
import logo from './logo.svg';
import './App.css';

const data = 'News';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

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
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
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
	onSearchChange(event){
		this.setState({searchTerm: event.target.value});
		//this.props.onSearchTermChange(term);
		//this.props.fetchSearchTopstories(searchTerm);
	}
	fetchSearchTopstories(searchTerm, page){
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
		.then(response => response.json())
		.then(result => this.setSearchTopstories(result));
	}
	setSearchTopstories(result) {
		const { hits, page } = result;
		const oldHits = page !== 0 ? this.state.result.hits : [];
		const updatedHits = [ ...oldHits, ...hits ];
		this.setState({
			result: { hits: updatedHits, page }
		});
	}
	onSearchSubmit(event) {
		const { searchTerm } = this.state;
		this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
		event.preventDefault();
	}
	componentDidMount(searchTerm) {
		//const { searchTerm } = this.state;
		this.fetchSearchTopstories(this.state.searchTerm, DEFAULT_PAGE);
	}

  	render() {
  		const { searchTerm, result } = this.state;
  		const page = (result && result.page) || 0;
		if (!result) { return null; }
	    return (
	      <div className="App">
	        <div className="App-header">
	          <img src={logo} className="App-logo" alt="logo" />
	          <h2>Welcome to React { data }</h2>
	          <Search
					value={searchTerm}
					onChange={ this.onSearchChange }
					onSubmit={this.onSearchSubmit}>
					Search
			  </Search>
	        </div>
	        <div className="container">
	          	{ result
					? <Table
						list={result.hits}
						onDismiss={this.onDismiss}
					/>
					: null
				}
	        </div>
	        <div className="interactions">
	        	<Button onClick={() => this.fetchSearchTopstories(searchTerm, page + 1)}>More</Button>
			</div>
	      </div>
	    );
  	}
}


if (module.hot) {
module.hot.accept()
}
export default App;
