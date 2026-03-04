import React, { Component } from 'react';
import Card from './Componants/Card.jsx';
import { nanoid } from 'nanoid'
import Products from './Products.json';

class App extends Component {
	state = {
		Products: Products,
		showForm: false,
		newProduct: {
			name: '',
			price: '',
			quantity: '',
			category: ''
		}
	}
	
	// increase function
	increaseQuantity = (id) => {
		this.setState(prevState => ({
			Products: prevState.Products.map(product =>
				product.id === id ? { ...product, quantity: product.quantity + 1 } : product
			)
		}));
	}
	
	// decrease function
	decreaseQuantity = (id) => {
		this.setState(prevState => ({
			Products: prevState.Products.map(product =>
				product.id === id && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
			)
		}));
	}
	
	// delete function
	deleteProduct = (id) => {
		this.setState(prevState => ({
			Products: prevState.Products.filter(product => product.id !== id)
		}));
	}
	
	// clear all products 
	clearAllProducts = () => {
		this.setState({
			Products: []
		});
	}
	
	// toggle form visibility
	toggleForm = () => {
		this.setState(prevState => ({
			showForm: !prevState.showForm,
			newProduct: {
				name: '',
				price: '',
				quantity: '',
				category: ''
			}
		}));
	}
	
	// handle input change
	handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState(prevState => ({
			newProduct: {
				...prevState.newProduct,
				[name]: value
			}
		}));
	}
	
	// add new product
	addProduct = (e) => {
		e.preventDefault();
		const { name, price, quantity, category } = this.state.newProduct;
		 const maxId = Math.max(...this.state.Products.map(p => p.id), 0);
		if (name && price && quantity && category) {
			const newProduct = {
				id: maxId + 1,
				name,
				price: parseFloat(price),
				quantity: parseInt(quantity),
				category
			};
			
			this.setState(prevState => ({
				Products: [...prevState.Products, newProduct],
				showForm: false,
				newProduct: {
					name: '',
					price: '',
					quantity: '',
					category: ''
				}
			}));
		}
	}
	
	render() {
		console.log(this.state.Products);
		return (
			<>
				{this.state.Products.length === 0 && (
					<div className="text-center text-gray-500 text-xl font-bold mt-10">
						No products available.
					</div>
				)}
				
				<div className='m-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6'>
					{this.state.Products.map(product => (
						<Card
							key={nanoid()}
							id={product.id}
							name={product.name}
							price={product.price}
							quantity={product.quantity}
							category={product.category}
							increaseQuantity={this.increaseQuantity}
							decreaseQuantity={this.decreaseQuantity}
							deleteProduct={this.deleteProduct}
						/>
					))}
				</div>
				
				<div className="flex gap-4 m-6">
					<button 
						className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all hover:scale-105"
						onClick={() => this.clearAllProducts()}
					>
						Clear All Products
					</button>
					
					<button 
						className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all hover:scale-105"
						onClick={this.toggleForm}
						
					>
						Add new product 
					</button>
				</div>
				
				{/* Form for new product */}
				{this.state.showForm && (
					<div className="m-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>
						<form onSubmit={this.addProduct} className="flex flex-col gap-4">
							<input
								type="text"
								name="name"
								placeholder="Product Name"
								value={this.state.newProduct.name}
								onChange={this.handleInputChange}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								required
							/>
							
							<input
								type="number"
								name="price"
								placeholder="Price"
								step="0.01"
								value={this.state.newProduct.price}
								onChange={this.handleInputChange}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								required
							/>
							
							<input
								type="number"
								name="quantity"
								placeholder="Quantity"
								value={this.state.newProduct.quantity}
								onChange={this.handleInputChange}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								required
							/>
							
							<select
								name="category"
								value={this.state.newProduct.category}
								onChange={this.handleInputChange}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
								required
							>
								<option value="">Select Category</option>
								<option value="Electronics">Electronics</option>
								<option value="Food & Beverage">Food & Beverage</option>
								<option value="Accessories">Accessories</option>
								<option value="Sports & Outdoor">Sports & Outdoor</option>
								<option value="Clothing">Clothing</option>
								<option value="Books">Books</option>
							</select>
							
							<button
								type="submit"
								className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all hover:scale-105"
							>
								Add Product
							</button>
						</form>
					</div>
				)}
			</>
		);
	}
}

export default App;