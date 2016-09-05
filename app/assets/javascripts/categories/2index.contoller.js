"use strict";

(function(){
  angular
  .module("categories", ["ngResource"])
  .controller("CategoryIndexController", [
    "$resource",
    "CategoryFactory",
    "$stateParams",
    "$http",
    "$state",
    CategoryIndexController
  ])

  /Index all the Categories
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
  })();
