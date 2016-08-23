"use strict";

(function(){
  angular
  .module("luv2cook", [
    "ui.router",
    "ngResource",
    "sessions",
    "users",
    "categories",
    "recipes",
    "ingredients"
  ])
  .config(["$stateProvider", "$locationProvider", RouterFunction]);

    function RouterFunction($stateProvider, $locationProvider){
      $locationProvider.html5Mode(true);
      $stateProvider
      .state("categoryIndex", {
        url: "/categories",
        templateUrl: "categories/index.html.erb",
        controller: "category_controller",
        controllerAs: "CategoryIndexViewModel"
      })
      .state("categoryShow", {
        url: "/categories/:id",
        templateUrl: "categories/show.html.erb",
        controller: "CategoryShowController",
        controllerAs: "CategoryShowViewModel"
      })
      .state("categoryEdit", {
        url: "/categories/:id/edit",
        templateUrl: "categories/edit.html.erb",
        controller: "CategoryEditController",
        controllerAs: "CategoryEditViewModel"
      })
      .state("recipeIndex", {
        url: "/recipes",
        templateUrl: "recipes/index.html.erb",
        controller: "recipe_index_controller",
        controllerAs: "RecipeIndexViewModel"
      })
      .state("recipeNew", {
        url: "/recipes/new",
        templateUrl: "recipes/new.html.erb",
        controller: "recipe_new_controller",
        controllerAs: "RecipeNewViewModel"
      })
      .state("recipeEdit", {
        url: "/recipes/:id/edit",
        templateUrl: "recipes/edit.html.erb",
        controller: "RecipeEditController",
        controllerAs: "RecipeEditViewModel"
      })
      .state("recipeShow", {
        url: "/recipes/:id",
        templateUrl: "recipes/show.html.erb",
        controller: "RecipeShowController",
        controllerAs: "RecipeShowViewModel"
      })
      .state("ingredientIndex", {
        url: "/ingredients",
        templateUrl: "ingredients/index.html.erb",
        controller: "ingredient_controller",
        controllerAs: "IngredientIndexViewModel"
      })
      .state("ingredientEdit", {
        url: "/ingredients/:id/edit",
        templateUrl: "ingredients/edit.html.erb",
        controller: "IngredientEditController",
        controllerAs: "IngredientEditViewModel"
      })
      .state("ingredientShow", {
        url: "/ingredients/:id",
        templateUrl: "ingredients/show.html.erb",
        controller: "IngredientShowController",
        controllerAs: "IngredientShowViewModel"
      });
  }
})();
