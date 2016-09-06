"use strict";

(function(){
  angular
  .module("recipes")
  .factory("RecipeFactory", [
    "$resource",
    RecipeFactoryFunction
  ]);

  function RecipeFactoryFunction($resource) {
    return $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
