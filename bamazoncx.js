
var mysql = require("mysql");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

function loadProducts() {
 
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    cxitems(res);
  });
}


function cxitems(inventory) {
  
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "what is your items id"
      }
    ])
    .then(function() {

      if (product) {
        console.log ("whats wrong")
        cxquanity(product);
      }
      else {
 
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}


function cxquanity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        
      }
    ])
    .then(function(val) {
     


      
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
       
        makePurchase(product, quantity);
      }
    });
}

// Purchase the desired quantity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}


function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }

  return null;
}




























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































