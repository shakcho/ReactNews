import React from 'react';

const Search = ({value, onChange, children}) => {
	return(
		<form className="form-inline">
			<div className="form-group">
				{children}
				<input 
					type="text"
					className="form-control"
					value={value}
					onChange={onChange} />
				</div>
		</form>
)}
export default Search;