"use strict";

(function(){
  angular
  .module("luv2cook", [
    "ui.router",
    "ngResource",
    "categories"
  ])
  .config(["$stateProvider", "$locationProvider", RouterFunction])
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
  .controller("CategoryController", [
    "$resource",
    "CategoryFactory",
    "$http",
    CategoryController
  ])
  .controller("CategoryEditController", [
    "CategoryFactory",
    "$stateParams",
    "$resource",
    CategoryEditControllerFunction
  ])
  .controller("CategoryShowController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
    "$stateParams",
    "$resource",
    CategoryShowControllerFunction
  ])
  .controller("RecipeIndexController", [
    "$resource",
    "RecipeFactory",
    RecipeController
  ])
  .controller("RecipeShowController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
    "$stateParams",
    "$resource",
    RecipeShowControllerFunction
  ])
  // .controller("RecipeNewController", [
  //   "CategoryFactory",
  //   "RecipeFactory",
  //   "IngredientFactory",
  //   "$stateParams",
  //   "$resource",
  //   RecipeNewControllerFunction
  // ])
  .controller("RecipeEditController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
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
        controller: "CategoryController",
        controllerAs: "vm"
      })
      .state("categoryShow", {
        url: "/:id",
        templateUrl: "/views/categories/show.html",
        controller: "CategoryShowController",
        controllerAs: "vm"
      })
      .state("categoryEdit", {
        url: "/category/:category_id/edit",
        templateUrl: "/views/categories/edit.html",
        controller: "CategoryEditController",
        controllerAs: "vm"
      })
      .state("recipeIndex", {
        url: "/recipes",
        templateUrl: "recipes/index.html.erb",
        controller: "RecipeIndexController",
        controllerAs: "RecipeIndexViewModel"
      })
      .state("recipeNew", {
        url: "/recipes/new",
        templateUrl: "recipes/new.html.erb",
        controller: "RecipeNewController",
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
      // .state("ingredientIndex", {
      //   url: "/ingredients",
      //   templateUrl: "ingredients/index.html.erb",
      //   controller: "ingredient_controller",
      //   controllerAs: "IngredientIndexViewModel"
      // })
      // .state("ingredientEdit", {
      //   url: "/ingredients/:id/edit",
      //   templateUrl: "ingredients/edit.html.erb",
      //   controller: "IngredientEditController",
      //   controllerAs: "IngredientEditViewModel"
      // })
      // .state("ingredientShow", {
      //   url: "/ingredients/:id",
      //   templateUrl: "ingredients/show.html.erb",
      //   controller: "IngredientShowController",
      //   controllerAs: "IngredientShowViewModel"
      // });
  }


  function CategoryController($resource, CategoryFactory, $http){
    // event.preventDefault();
    var vm = this;
    var Category = $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.category_data = CategoryFactory.query();

    vm.sort_category_data_by = function(name){
      vm.sort_on = vm.category_data.Cat_name;
      vm.is_ascending = !(vm.is_ascending);
    }


    vm.destroy = function(category_index){
      console.log("idex"+vm.category_data[category_index])
      var category = vm.category_data[category_index];
      Category.remove({id: category.id}, function(response){
        if(response.success) vm.category_data.splice(category_index, 1);
      });
    }

      vm.new_category = new CategoryFactory();
       vm.create = function(){
        //  console.log("category"+vm.new_category.Cat_name)
       vm.new_category.$save(function(response){
        // console.log("response "+response)
        if(response.success) vm.catgory_data.push(response);
        vm.new_catgory = new CategoryFactory();
      })
         vm.category_data.push(angular.copy(vm.new_category));
         vm.new_category = {};
       }


    vm.update = function(category){
      Category.update({id: category.id}, category, function(response){
        category.showEdit = !category.showEdit

      });
    }
    vm.search = function(searchparams){
      $http({
             method: "JSONP",
             url: "http//food2fork.com/api/search?key=8839d43ca16417686535ff6e05b77f18&q=shredded%20chicken",
             headers: {
                 "Accept": "application/jsonp"
             }
           }).then(function successCallback(response) {
                   console.log(response);
             }, function errorCallback(response) {
               console.log(response);
             });
    }
  }
 //  function RecipeAPIFactoryFunction($resource) {
 //    return $resource( "http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken")
 //
 // "http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken"
 //     ENV["FOOD2FORK_KEY"] = '8839d43ca16417686535ff6e05b77f18'
 //     base_uri 'http://food2fork.com/api'
 //     default_params key: ENV["FOOD2FORK_KEY"]
 //     format :json
 //     console.log("In models recipe rb")
 //     def self.for term
 //     get("/search", query: { q: term})["recipes"]
 //     end
 //    end
  //
  //   return $resource("/categories/:id.json", {}, {
  //     update: {method: "PUT"}
  //   });
  //  }

  function CategoryFactoryFunction($resource) {
    return $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
  }


  function CategoryEditControllerFunction(CategoryFactory, $stateParams, $resource){
    // var vm = this;
    // console.log("vm "+vm[0])
    // console.log("ID="+$statParams.id)
    // vm.category = CategoryFactory.get({id: $stateParams.id},function(res){
    //      console.log("This is this.category in Factory function:  "+JSON.stringify(res))
    //   })
    //   console.log("IN 4EDIT")
    //   console.log("This is this.category:  "+vm.category)
    //   vm.update = function(){
    //     console.log("button click")
    //     var categoryID = JSON.stringify(vm.category.id)
    //           console.log(categoryID)
    //     vm.category.$update({id: $stateParams.id});
    // }
  }


  function CategoryShowControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, $stateParams, $resource){
    console.log("in the category show controller")
    var vm = this;
    var Recipe = $resource("/recipes/:id.json", {}, {
        update: {method: "PUT"}
      });
    console.log("vm "+vm[0])
    console.log("state params "+$stateParams)
    console.log("resource "+$resource)
    console.log("id"+$stateParams.id)
    CategoryFactory.get({id: $stateParams.id}).$promise.then(function(category) {
      vm.category = category
      console.log("category"+JSON.stringify(category))
    })
    // vm.recipes = RecipeFactory.query({category_id: $stateParams.id})
    // console.log("recipe "+ vm.recipes)
    //   // this.update = function(category){
    //   //   category.$update(category);
    //   // }

    RecipeFactory.query({category_id: $stateParams.id}).$promise.then(function(recipes){
      vm.recipes = recipes
      console.log("recipe "+JSON.stringify(recipes))
      // this.update = function(category){
      //   category.$update(category);
      // }
    })



      vm.update = function(recipe){
        console.log("recipe update recipe"+ recipe)
        Recipe.update({id: recipe.id}, recipe, function(response){
          console.log ("Recipe Update response "+response)
        })
      }



        vm.destroy = function(recipe_index){
          console.log("id "+$stateParams.id)
          console.log("index "+vm.recipes[recipe_index])
          var recipe = vm.recipes[recipe_index]
          Recipe.remove({id: recipe.id})
          vm.recipes.splice(recipe_index, 1)

        }




    vm.new_recipe = new RecipeFactory(); //{category_id: $stateParams.id});
    console.log("ID"+$stateParams.id)
    console.log("NEW RECIPE "+JSON.stringify(vm.new_recipe))
     vm.create = function(){
       console.log("in create function!")
      console.log("recipe title "+vm.new_recipe)
      vm.new_recipe.$save({category_id: $stateParams.id}, function(response){

        console.log("response "+response)
        if(response.success) vm.new_recipe.push(response);
        vm.new_recipe = new RecipeFactory(); //{category_id: $stateParams.id});
        console.log("ID"+$stateParams.id)
        console.log("NEW RECIPE "+vm.new_recipe)
    })
       vm.recipes.push(angular.copy(vm.new_recipe));
       vm.new_recipe = {};
      //  recipe.showAdd = !recipe.showAdd

     }

    //  vm.new_ingredient = new IngredientFactory(); //{category_id: $stateParams.id});
    //  console.log("ID"+$stateParams.id)
    //  console.log("IDr"+$stateParams.recipe_id)
    //  console.log("NEW INGREDIENT "+JSON.stringify(vm.new_ingredient))
    //   vm.new = function(){
    //     IngredientFactory.query({recipe_id: vm.recipe.id}).$promise.then(function(ingredients){
    //       vm.ingredients = ingredients
    //       console.log("ingredients after recipe add "+JSON.stringify(ingredients))
    //       if (!vm.ingredients){
    //         vm.ingredients=[]
          // }
          // this.update = function(category){
          //   category.$update(category);
          // }
        // })
    //    console.log("ingredients after recipe add 222"+JSON.stringify(ingredients))
    //     console.log("in create ingredient function!")
    //    console.log("recipe componenet "+vm.new_ingredient)
    //    vm.new_ingredient.$save({recipe_id: $stateParams.recipe_id}, function(response){
    //      console.log("response "+response)
    //      if(response.success) vm.new_ingredient.push(response);
    //      vm.new_ingredient = new RecipeFactory(); //{category_id: $stateParams.id});
    //      console.log("ID"+$stateParams.id)
    //      console.log("NEW RECIPE "+vm.new_ingredient)
    //  })
    //     vm.ingredients.push(angular.copy(vm.new_ingredient));
    //     vm.new_ingredient = {};
    //   }


  }
  function RecipeFactoryFunction($resource) {
    // console.log()
    // return $resource("/categories/" + $stateParams.id + "/recipes/:id.json", {}, {
    return $resource("/categories/:category_id/recipes/:id.json", {}, {
      update: {method: "PUT"}
    });
  }


  // function CreateRecipeFactoryFunction($resource) {
  //   // console.log()
  //   return $resource("/categories/" + $stateParams.id + "/recipes/:id.json", {}, {
  //     update: {method: "PUT"}
  //   });
  // }

  function RecipeController($resource, RecipeFactory){
    var vm = this;
    var Recipe = $resource("/recipes/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.recipe_data = Recipe.query()
    console.log("recipe-data "+vm.recipe_data)


    vm.sort_recipe_data_by = function(name){
      vm.sort_on = name;
      vm.is_descending = !(vm.is_descending);
    }

    // vm.destroy = function(recipe_index){
    //   var recipe = vm.recipe_data[recipe_index];
    //   Recipe.remove(recipe_index, function(response){
    //     if(response.success) vm.recipe_data.splice(recipe_index, 1);
    //   });
  //  }

    vm.update = function(recipe){
      Recipe.update({id: recipe.id}, recipe, function(response){
        console.log("Recipe updated!");
      });
    }
  }
  function RecipeShowControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, $stateParams, $resource){
    console.log("in the recipe show controller")
    var vm = this;
    console.log("vm "+vm[0])
    console.log("this "+this)
    console.log("cat id"+$stateParams.category_id)
    console.log("id"+$stateParams.id)
    CategoryFactory.get({id: $stateParams.category_id}).$promise.then(function(category) {
      vm.category = category
      console.log("category"+category)
    })
    RecipeFactory.get({category_id: $stateParams.category_id, id: $stateParams.id }).$promise.then(function(recipe) {
      vm.recipe = recipe
      console.log("category"+recipe)
    })
    vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
    console.log("ingredients "+vm.ingredients)

    this.update = function(recipe){
      recipe.$update(recipe);
    }
    this.destroy = function(recipe_index){
      console.log("catid "+$stateParams.category_id)
      console.log("id "+$stateParams.id)
      console.log("index "+recipe_index)
      console.log("this recipe = "+this.recipe)
      RecipeFactory.remove(recipe_index);
      this.recipe.splice(recipe_index, 1)
    }
    // vm.destroy = function($Index){
    //   RecipeFactory.remove(category_id: $stateParams.category_id, id: $stateParams.id);
    //   vm.recipe.splice(id: $stateParams.id, 1)
    // }
  }
  function IngredientFactoryFunction($resource) {
    return $resource("/recipes/:recipe_id/ingredients.json", {}, {
      update: {method: "PUT"}
    })
  }


  function RecipeEditControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, $stateParams, $resource, $state){
      console.log("in the recipe edit controller")
      var vm = this;
      console.log("vm "+vm[0])
      console.log("this "+this)
      console.log("cat id"+$stateParams.category_id)
      console.log("id"+$stateParams.id)
      // CategoryFactory.get({category_id: $stateParams.category_id}).$promise.then(function(category) {
      //   vm.category = category
      //   console.log("category"+category)
      // })
      RecipeFactory.get({category_id: $stateParams.category_id, id: $stateParams.id }).$promise.then(function(recipe) {
        vm.recipe = recipe
        console.log("category"+JSON.stringify(recipe))
      })
      vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
      console.log("ingredients "+vm.ingredients)


      vm.update = function(recipe){
        console.log(" update ID"+JSON.stringify($stateParams.id))
        console.log(" update catID"+JSON.stringify($stateParams.category_id))

        vm.recipe.$update({category_id: $stateParams.category_id, id: $stateParams.id}), function(response){
          console.log("updated")

        }
        // vm.recipe.$update({category_id: $stateParams.category_id, id: $stateParams.id}).then(function(response){
        //   console.log("updated")
        //   $state.go("categoryIndex", {}, {reload: true});
        // })
      }

      vm.destroy = function(index){
        RecipeFactory.remove(index)
        vm.recipe.splice(index, 1)
      }
 }


})(); // closes Main IFFEE
