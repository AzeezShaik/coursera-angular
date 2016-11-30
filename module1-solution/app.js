(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];

function LunchController($scope) {
  $scope.lunchItemsString = "";
  $scope.lunchMessage="";
  $scope.msgColor = "black";

// check number of item by calling function - calculateNumberOfItems

  $scope.chkNumberOfItems = function () {
    $scope.lunchMessage = calculateNumberOfItems($scope.lunchItemsString);

  };

  function calculateNumberOfItems(string) {
    var lunchItems = "";
    var numberOfItems = 0;
    var message ="";
    lunchItems = string.split(',');

    for (var i = 0; i < lunchItems.length; i++) {
      if (lunchItems[i] != "") {
        numberOfItems++;
      }
    }

    if (numberOfItems == 0) {
      message = "Please enter data first";
      //  $scope.msgColor =  "{color:'red'}";
    }

    else if (numberOfItems > 0 && numberOfItems <= 3) {
       message = "Enjoy!";
      //  $scope.msgColor =  "color: "green" ";

    }
    else if (numberOfItems > 3) {
        message = "Too much!";
        // $scope.msgColor =  "color: "green" ";

    }

    return message;
  }


}

})();
