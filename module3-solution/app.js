(function () {
'use strict';

angular.module('NarrowitDownApp', [])
.controller('NarrowitDownController', NarrowitDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowitDownController.$inject = ['MenuSearchService'];

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowitDownController,
    controllerAs: 'menu',
    bindToController: true
  };
  return ddo;
};


function NarrowitDownController(MenuSearchService) {
  var menu = this; 
  
  menu.searchMenuItems = function () {
  menu.items = [];
  if(menu.searchTerm){
    //console.log(menu.searchTerm)
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
      
      //console.log(response);
      if(response.length == 0) {
            menu.items = [];
            menu.errorMessage = "Nothing found";
          } else {
            menu.items = response;
            menu.errorMessage = "";
          }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else{
    menu.errorMessage = "Nothing found";
  }
};

 menu.removeItem = function (itemIndex) {
    menu.items.splice(itemIndex,1);
  }
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var items = [];
  var foundItems = [];

 service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")      
    }).then (function (response){

    // process result and only keep items that match

    items = response.data.menu_items;
    foundItems = [];
        for (var index = 0; index < items.length; index++) {
          if (items[index].description.indexOf(searchTerm) != -1) {
            foundItems.push(items[index]);
          }
        }

        // return processed items
      return foundItems;
    });
  };
}

})();
