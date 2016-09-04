"use strict";

(function(){
  angular
  .module("luv2cook", [
    "ui.router",
    "ngResource",
    "categories"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    RouterFunction
  ])
  .factory("CategoryFactory", [
    "$resource",
    CategoryFactoryFunction
  ])
  .factory("RecipeFactory", [
    "$resource",
    RecipeFactoryFunction
  ])
  .factory("IngredientFactory", [
    "$resource",
    IngredientFactoryFunction
  ])
  .factory("MeasurementsFactory", [
   "$resource",
   MeasurementsFactoryFunction
  ])
  .controller("CategoryIndexController", [
    "$resource",
    "CategoryFactory",
    "$stateParams",
    "$http",
    "$state",
    CategoryIndexController
  ])
  .controller("CategoryShowController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
    "$stateParams",
    "$resource",
    "$state",
    CategoryShowControllerFunction
  ])
  .controller("RecipeShowController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
    "MeasurementsFactory",
    "$stateParams",
    "$resource",
    "$state",
    RecipeShowControllerFunction
  ])
  .controller("RecipeEditController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
    "MeasurementsFactory",
    "$stateParams",
    "$resource",
    "$state",
    RecipeEditControllerFunction
  ]);
    function RouterFunction($stateProvider, $locationProvider){
      // $locationProvider.html5Mode(true);
      $stateProvider
      .state("categoryIndex", {
        url: "",
        templateUrl: "/views/categories/index.html",
        controller: "CategoryIndexController",
        controllerAs: "vm"
      })
      .state("categoryShow", {
        url: "/:id",
        templateUrl: "/views/categories/show.html",
        controller: "CategoryShowController",
        controllerAs: "vm"
      })
      .state("recipeEdit", {
        url: "/category/:category_id/recipes/:id/edit",
        templateUrl: "/views/recipes/edit.html",
        controller: "RecipeEditController",
        controllerAs: "vm"
      })
      .state("recipeShow", {
        url: "/category/:category_id/recipes/:id",
        templateUrl: "/views/recipes/show.html",
        controller: "RecipeShowController",
        controllerAs: "vm"
      })
  }
//Index all the Categories
  function CategoryIndexController($resource, CategoryFactory, $stateParams, $http, $state){
    var vm = this;
    vm.category_data = {}
//Get categories from the database
    var Category = $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.category_data = CategoryFactory.query();

//Delete a Category
    vm.destroy = function(cat){
      Category.remove({id: cat.id}, function(response){
        if(response.success) vm.category_data.splice(vm.category_data.indexOf(cat), 1);
      });
    }

//Create a Category throw an error if name is blank
    vm.new_category = new CategoryFactory();
    vm.create = function(){
      if (vm.new_category.Cat_name){
        Category.save(vm.new_category, function(response){
          if(response.success) vm.catgory_data.push(response);
            vm.new_catgory = new CategoryFactory();
          })
          vm.category_data.push(angular.copy(vm.new_category));
      }else{
          alert("Category can not be blank!!");
      }
      vm.new_category = {};
    }

//Edit Category
    vm.update = function(category){
      Category.update({id: category.id}, category, function(response){
        category.showEdit = !category.showEdit
      });
    }
  } //Close CategoryIndexController

  function CategoryFactoryFunction($resource) {
    return $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
  }


  function CategoryShowControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, $stateParams, $resource, $state){
    var vm = this;
    var Recipe = $resource("/recipes/:id.json", {}, {
        update: {method: "PUT"}
      });
//set Category
    CategoryFactory.get({id: $stateParams.id}).$promise.then(function(category) {
      vm.category = category
    })

//find all Recipes for this Category
    RecipeFactory.query({category_id: $stateParams.id}).$promise.then(function(recipes){
      vm.recipes = recipes
    })

//delete Recipe
    vm.destroy = function(recipe_index){
      var recipe = vm.recipes[recipe_index]
      Recipe.remove({id: recipe.id})
      vm.recipes.splice(recipe_index, 1)
      }

//Add a new recipe must reload vm.recipes through recipe factory after add update with new Ingredient ID
    vm.new_recipe = new RecipeFactory(); //{category_id: $stateParams.id});
//Create new recipe
    vm.create = function(){
//Recipe must have a title
      if (vm.new_recipe.title) {
// Add new Recipe to database
        vm.new_recipe.$save({category_id: $stateParams.id}, function(response){
// New Recipe Id is not Accessible - update vm.recipes so it contains the new recipe
          RecipeFactory.query({category_id: $stateParams.id}).$promise.then(function(recipes){
            vm.recipes = recipes
            //  var sortedData= array .sort((function (a, b) {
            //                   return new Date(b.date) - new Date(a.date)
            //                 }));
// Take the Recipes and Sort them by Date so the Newest Recipe is Last - capture the new newRecipe in newRecipes sorted array
            var newRecipes = recipes.sort(function(a,b){return new Date(a.created_at) - new Date(b.created_at)});
            var newRecipe = {}
            newRecipe = newRecipes[recipes.length - 1]
// Now that we know the ID of the newly created recipe we can add ingredients which contain the foreign key recipe_id - redirect to edit where you can add update delete ingredients
             $state.go("recipeEdit", {id: newRecipe.id, category_id: $stateParams.id}, {reload: true})
           })
//  if(response.success) vm.recipes.push(response) - update angular table to reflect new recipe on screen
           vm.new_recipe = new RecipeFactory(); //{category_id: $stateParams.id});
         })
         vm.recipes.push(angular.copy(vm.new_recipe));
       } else {
         alert("Recipe name can not be blank!!");
       }
       vm.new_recipe = {};
       vm.ingredients = {}
    }
  }
  function RecipeFactoryFunction($resource) {
    return $resource("/categories/:category_id/recipes/:id.json", {}, {
      update: {method: "PUT"}
    });
  } //Close CategoryShowController

    function MeasurementsFactoryFunction() {
      return {
          query: function() {

              // Return Hard-coded data
              return ["C", "Tb", "tsp", "oz", "stick(s)", "piece(s)", "head", "whole", "small", "medium", "large"];
          }
      }
  };

//Show one Recipe
  function RecipeShowControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, MeasurementsFactory, $stateParams, $resource, $state){
    var vm = this;
    CategoryFactory.get({id: $stateParams.category_id}).$promise.then(function(category) {
      vm.category = category
    })
    RecipeFactory.get({category_id: $stateParams.category_id, id: $stateParams.id }).$promise.then(function(recipe) {
      vm.recipe = recipe
    })
    vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})

    var Ingredient = $resource("/ingredients/:id.json", {}, {
        update: {method: "PUT"}
      });
      vm.measurements = MeasurementsFactory.query();


      vm.update = function(ing){
        Ingredient.update({id: ing.id}, ing, function(response){
        });
      }

    vm.destroy = function(ing){
      Ingredient.remove({id: ing.id}, function(response){
        if(response.success) vm.ingredients.splice(vm.ingredients.indexOf(ing), 1);
      });
    }


    vm.new_ingredient = new IngredientFactory(); //{category_id: $stateParams.id});
     vm.create = function(){
       vm.new_ingredient.$save({recipe_id: $stateParams.id}, function(response){
         vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
         if(response.success) vm.new_ingredient.push(response);
         vm.new_ingredient = new IngredientFactory();
       })
       vm.ingredients.push(angular.copy(vm.new_ingredient))
       vm.new_ingredient = {}
    }
  }

  function IngredientFactoryFunction($resource) {
    return $resource("/recipes/:recipe_id/ingredients/:id.json", {}, {
      update: {method: "PUT"}
    })
  }

  function RecipeEditControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, MeasurementsFactory, $stateParams, $resource, $state){
      var vm = this;
      CategoryFactory.get({id: $stateParams.category_id}).$promise.then(function(category) {
        vm.category = category
      })
      RecipeFactory.get({category_id: $stateParams.category_id, id: $stateParams.id }).$promise.then(function(recipe) {
        vm.recipe = recipe
      })
      vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
      var Ingredient = $resource("/ingredients/:id.json", {}, {
          update: {method: "PUT"}
        });
      vm.measurements = MeasurementsFactory.query();

      vm.updateRecipe = function(recipe){
        vm.recipe.$update({category_id: $stateParams.category_id, id: $stateParams.id}), function(response){}
      }

      vm.new_ingredient = new IngredientFactory()
      vm.create = function(){
        vm.new_ingredient.$save({recipe_id: $stateParams.id}, function(response){
          vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
          if(response.success) vm.new_ingredient.push(response);
          vm.new_ingredient = new IngredientFactory();
        })
         vm.ingredients.push(angular.copy(vm.new_ingredient))
         vm.new_ingredient = {}
      }

      vm.updateIngredient = function(ing){
        Ingredient.update({id: ing.id}, ing, function(response){});
      }

      vm.destroy = function(ing){
        Ingredient.remove({id: ing.id}, function(response){
          if(response.success) vm.ingredients.splice(vm.ingredients.indexOf(ing), 1);
        })
      }
 }


})(); // closes Main IFFEE
