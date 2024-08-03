import	React from 'react'
import { Routes, Route, Link } from 'react-router-dom'; 

import Shop from './Shop.js';
import Admin from './Admin.js';

export default function App() {
    return (
	<div>
	    <aside>
	        <Link to={'/'}>Shop</Link> | <Link to={'/admin'}>Add-Book</Link>
	    </aside>
	    <main>
		<Routes>
			<Route path='/' element={<Shop/>} />
			<Route path='/admin' element={<Admin/>} />
		</Routes>
	    </main>
	 </div>
    )
}

