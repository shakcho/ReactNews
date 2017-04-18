import React from 'react';

const Search = ({value, onChange,onSubmit, children}) => {
	return(
		<form className="form-inline">
			<div className="form-group">
				{children}
				<input 
					type="text"
					className="form-control"
					value={value}
					onChange={onChange} 
				/>
				<button type="submit" className="btn btn-default">
					{children}
				</button>
			</div>
		</form>
)}
export default Search;