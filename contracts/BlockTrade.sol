// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ECommerce {
    struct Product {
        uint id;
        string name;
        uint price;
        address payable seller;
        bool purchased;
    }

    mapping(uint => Product) public products;
    uint public productsCount;

    event ProductAdded(uint id, string name, uint price, address seller);
    event ProductPurchased(uint id, address buyer);

    function addProduct(string memory _name, uint _price) public {
        require(_price > 0, "Price must be greater than zero");

        productsCount++;
        products[productsCount] = Product(productsCount, _name, _price, payable(msg.sender), false);
        emit ProductAdded(productsCount, _name, _price, msg.sender);
    }

    function purchaseProduct(uint _id) public payable {
        Product memory product = products[_id];
        require(product.id > 0 && product.id <= productsCount, "Product does not exist");
        require(msg.value == product.price, "Incorrect value sent");
        require(!product.purchased, "Product already purchased");

        product.seller.transfer(msg.value);
        product.purchased = true;
        products[_id] = product;

        emit ProductPurchased(_id, msg.sender);
    }
}
