import React from 'react';
import Button from './button';

// const isSearched = (searchTerm) => (item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
// function isSearched(searchTerm) {
// 	return function(item) {
// 		return !searchTerm ||
// 			item.title.toLowerCase().includes(searchTerm.toLowerCase());
// 	}
// }

const Table = ({ list, onDismiss }) => {
	return (
		<div className="col-md-8">
			<table className="table table-striped" >
						<thead>
							<tr>
								<th>Title</th>
								<th>Author</th>
								<th>Comments</th>
								<th>Points</th>
								<th>Action</th>
							</tr>
						</thead> 
					<tbody>
					{ list.map(item =>
						<tr key={item.objectID}>
						<td>
							<a href={item.url}>{item.title}</a>
						</td>
						<td>{item.author}</td>
						<td>{item.num_comments}</td>
						<td>{item.points}</td>
						<td>
						<Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
						</td>
						</tr>	
					)}
				</tbody>
			</table>
		</div>
	);
}
export default Table;