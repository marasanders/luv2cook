"use strict";

(function(){
  angular
  .module("categories")
  .factory("CategoryFactory", [
    "$resource",
    CategoryFactoryFunction
  ]);

function CategoryFactoryFunction($resource) {
  return $resource("/categories/:id.json", {}, {
    update: {method: "PUT"}
  });
}
}());
