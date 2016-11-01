(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])

.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
//ShoppingListCheckOffService.$inject = ['$scope'];

function ToBuyController(ShoppingListCheckOffService){

  var ToBuyCtrl = this;
  ToBuyCtrl.Items = [];
  ToBuyCtrl.message = true;

  ToBuyCtrl.Items = ShoppingListCheckOffService.getItemsToBuy();

  ToBuyCtrl.boughtItem = function($index){

    ShoppingListCheckOffService.addItem($index);
    ToBuyCtrl.Items = ShoppingListCheckOffService.getItemsToBuy();
    if (ToBuyCtrl.Items.length == 0){
      ToBuyCtrl.message = false;
    }else{
      ToBuyCtrl.message = true;
    }

  }


}

function AlreadyBoughtController(ShoppingListCheckOffService){

  var ReadyBCtrl = this;
  ReadyBCtrl.Items = [];
  ReadyBCtrl.message = [];


  ReadyBCtrl.Items = ShoppingListCheckOffService.ItemsBought;
  ReadyBCtrl.message = ShoppingListCheckOffService.Message;

}

function ShoppingListCheckOffService(){
  var service = this;

  var ItemsBought = [];

  var Message = [true];

  service.Message = Message;

  service.ItemsBought = ItemsBought;

  var ItemsToBuy = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "bread",
      quantity: "2"
    }
  ];

  service.addItem = function (itemIndex) {

     var item1 = ItemsToBuy[itemIndex];
     var item = {
       name :item1.name,
       quantity :item1.quantity
     }

     ItemsBought.push(item);
     Message[0]  = false;
     ItemsToBuy.splice(itemIndex, 1);

 };

 /*service.getItemsBought = function () {
   return ItemsBought;
 };*/
 service.getItemsToBuy = function () {
   return ItemsToBuy;
 };

//console.log('items bought3: ' +  service.ItemsBought + 'message: ' + message1);
}

})();
