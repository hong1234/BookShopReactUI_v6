import	React from 'react'
import { Routes, Route, Link } from 'react-router-dom'; 

import Shop from './Shop';
import BookForm from './BookForm';

export default function App() {
    return (
	<div>
	    <aside>
	        <Link to={'/'}>Shop</Link> | <Link to={'/addbook'}>Add-Book</Link>
	    </aside>
	    <main>
		<Routes>
			<Route path='/' element={<Shop/>} />
			<Route path='/addbook' element={<BookForm/>} />
		</Routes>
	    </main>
	 </div>
    )
}

