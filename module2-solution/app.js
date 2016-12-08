(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {

  var toBuy = this;
  toBuy.items = ShoppingListService.getItems();

  toBuy.shoppingList = function(index){
      ShoppingListService.shoppingList(index);
    };

  toBuy.isEmpty = function(){
        return toBuy.items.length === 0;
    };

}

// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
  
  var alreadyBought = this;

  alreadyBought.items = ShoppingListService.itemsBought();

   alreadyBought.isEmpty = function(){
        return alreadyBought.items.length === 0;
    };
 }

function ShoppingListService() {
  
  var service = this;

  var toBuyList = [
    { name: "Milk",    quantity: "5" },
    { name: "Bread",  quantity: "3"},
    { name: "Cookies", quantity: "2"},
    { name: "Ice Cream",quantity: "1"},
    { name: "Muffins", quantity: "6"}
  ];

  var itemsBoughtList = [];

  service.getItems = function () {
     return toBuyList;
  };

  service.itemsBought = function(){
    return itemsBoughtList;
  };

  service.shoppingList = function(index){
      var value = toBuyList[index];
      itemsBoughtList.push(value);
      toBuyList.splice(index, 1);
    };
}

})();
