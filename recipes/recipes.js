"use strict";

(function(){
  angular
  .module("recipes", ["ngResource"])
  .controller("recipe_index_controller", ["$resource", "RecipeFactory", RecipeController]);

  function RecipeController($resource, RecipeFactory){
    var vm = this;
    var Recipe = $resource("/recipes/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.recipe_data = Recipe.query();

    vm.sort_recipe_data_by = function(name){
      vm.sort_on = name;
      vm.is_descending = !(vm.is_descending);
    }

    // vm.comment = new CommentFactory();
    // vm.create = function(){
    //   this.comments = CommentFactory.query()
    //   vm.comment.$save(function(response){
    //     console.log(vm.comment)
    //     if(response.success) vm.com_data.push();
    //   });
    // }

    vm.destroy = function(recipe_index){
      var recipe = vm.recipe_data[recipe_index];
      Recipe.remove(recipe_index, function(response){
        if(response.success) vm.recipe_data.splice(recipe_index, 1);
      });
    }

    vm.update = function(recipe){
      Recipe.update({id: recipe.id}, recipe, function(response){
        console.log("Recipe updated!");
      });
    }
  }
})();
