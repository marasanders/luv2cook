# README

1. Welcome to Baking-minus-the-math.

   Goals:

    1. An easy to access and navigate storage system for recipes.

    Future Goals:

    2. The ability to multiply and divide recipes.
    3. The ability to enter ingredients and find recipes locally.
    4. The ability to enter ingredients and find recipes on line (this has
       already been accomplished in rails locally I just need to implement it in angular)

The following are my notes for the creation of the data base:

rake assets:precompile
rails new baking-minus-the-math -d postgresql

rake db:create


1. rails g model Category Cat_name:string

2. rails g model Recipe title:string 'servings:decimal{5,2}' 'calories:decimal{7,2}' 'rating:decimal{4,2}' category:references


3. rails g model Ingredients component:string amount:string measurement:string amount2:string measurement2:string amount3:string measurement3:string amount4:string measurement4:string recipe:references

4. rake db:migrate

psql

\l lists all your databases
\c name of data base connects you to that database
\d will show you all your dependecies
\q quit

rails g migration AddInstructionsToRecipes instructions:text
rails g migration AddImageUrlToCategories image_url:text

rake db:migrate

models/ingredient.rb -

class Ingredient < ActiveRecord::Base
  belongs_to :recipe
end

models/recipe.rb -

class Recipe < ActiveRecord::Base
  validates :mailing_title, :last_name, presence: true
  has_many :ingredients, dependent: :destroy
  belongs_to :category
end

models/category.rb -

class Category < ActiveRecord::Base
   validates :Cat_name, presence: true
   has_many :recipes
end

rake db:seed

psql
\c baking-minus-the-math_development
SELECT * FROM recipes;

require_tree . remove from - app.js and app/stylesheets/application.css - good rails to not
   have so explicitly have to put in specific files so things don't appear on every page
   of your app

//= are directives any file in javasripts folder will get included whenrails preocompile
    we don't want it to be include in everypage so delete require tree

adding to very top of javascripts/categories/index.controller.js auto find and include when prcompiles

   //= require angular
   //= require angular-resource

 add to app/stylesheets/applicatin.css.scss

 / *
 * =      require bootstrap
 * /

 configure/initializers/assets.rb

 # Precompile additional assets. when rails starts will only precompile these - we are doing categories need
 # to specify your files
 # application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
 # Rails.application.config.assets.precompile += %w( search.js ) the w is saying ["products.js", "products.css"]

 un commented and put :  Rails.application.config.assets.precompile += %w( categories.js categories.css)


rake assets:precompile creates public/assets

go back to index.html and take out html tags all the way through body cuz repeats with application.html.erb

add to top on index.html.erb - <%= stylesheet_link_tag "categories", property: "stylesheet" %>
<% javascript_include_tag "categories" %>

controllers/categories_controller.rb

class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update]

  def index
    respond_to do |format|
      format.html
      format.json{ render json: Category.all }
    end
  end

http://localhost:3000/categories.json

added app.js  removed angular import from categories.js put everything in their own folder

//= require angular
//= require angular-resource
//= require angular-ui-router

set up angular app and states:

"use strict";

(function(){
  angular
  .module("luv2cook", [
    "ui.router",
    "ngResource",
    "categories",
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

1. add gem 'devise' to gem file
2. bundle install
3. rails g devise:install
4. add to gemfile - gem 'devise_token_auth'
5. bundle install
6. rails g devise_token_auth:install User auth


:string |                   VARCHAR             | :limit => 1 to 255 (default = 255)  

:text   | TINYTEXT, TEXT, MEDIUMTEXT, or LONGTEXT2 | :limit => 1 to 4294967296 (default = 65536)

'price:decimal{5,2}'
t.decimal :tax_percent, :precision => 6, :scale => 4
Would give you a total of six digits, with 4 after the decimal point.

(5.65235534).round(2)
#=> 5.65

this is what the solution has in it:

gem 'sdoc', '~> 0.4.0', group: :doc

gem 'devise'
gem 'devise_token_auth'
gem 'httparty'
gem 'rack-cors', require: 'rack/cors'


Some setup you must do manually if you haven't yet:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

       config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

     In production, :host should be set to the actual host of your application.

  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

       root to: "home#index"

  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

       <p class="notice"><%= notice %></p>
       <p class="alert"><%= alert %></p>

  4. You can copy Devise views (for customization) to your app by running:

       rails g devise:views

===============================================================================
marasanders@Maras-MacBook-Air-2:~/wdi/projects/project-4/baking-minus-the-math  $

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:



*****************************************
Adding a Recipe

on recipes show page have delete, update - this would be just on the recipe name level? or could show instructions and rest and just display ingredients or not probably the latter -

add - would have

  t.string   "title"
  t.decimal  "servings",     precision: 5, scale: 2
  t.decimal  "calories",     precision: 7, scale: 2
  t.decimal  "rating",       precision: 4, scale: 2
  t.text     "instructions"
  t.text     "photo_url"
  t.index ["category_id"], name: "index_recipes_on_category_id", using: :btree

  loop through to add

  create_table "ingredients", force: :cascade do |t|
    t.string   "component"
    t.string   "amount"
    t.string   "measurement"
    t.string   "amount2"
    t.string   "measurement2"
    t.string   "amount3"
    t.string   "measurement3"
    t.string   "amount4"
    t.string   "measurement4"
    t.string   "amount5"
    t.string   "measurement5"
    t.integer  "recipe_id"
    t.index ["recipe_id"], name: "index_ingredients_on_recipe_id", using: :btree

    you would need to validate measurements to be C, TB, tsp, oz, lb,
    you would need amount to be a fraction 1/16 1/8 1/4 1/3 3/8 1/2 2/3 5/8 3/4 7/8
    with or without a whole number,
