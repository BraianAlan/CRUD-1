const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsInSale = products.filter(product => product.category === "in-sale");
		let productsVisited = products.filter(product => product.category === "visited");
		res.render("index", {
			productsVisited,
			productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		let search = req.query.search;
        let searchResult = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()));
        res.render("results", { searchResult, search, toThousand })
	},
};

module.exports = controller;
