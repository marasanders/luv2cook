# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Ingredient.destroy_all
Recipe.destroy_all
Category.destroy_all


cake = Category.create!(Cat_name:"Cake", image_url: "http://st2.depositphotos.com/1026029/5632/i/950/depositphotos_56322535-Collage-of-different-pieces-of.jpg")
beef = Category.create!(Cat_name:"Beef", image_url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRnC69D26oiy95mP4X6rK-0uKXo14_nYaI_m4oRF6gEbZrtvF2PvA")
pasta = Category.create!(Cat_name:"Pasta", image_url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS_lZiLXLahRGedCgV524gqsNeNGqs00khySyWIWWXNmFejW1s8DQ")
chicken = Category.create!(Cat_name:"Chicken", image_url: "http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2014/7/14/0/FN_grilled-chicken-collage_s4x3.jpg")
rice = Category.create!(Cat_name:"Rice", image_url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQo8DSlZA-HRaPF95_FicpjGAe36SiXPWWezwVZCLO8xC7LfjPd")
dessert = Category.create!(Cat_name:"Dessert", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsB1OOmFR_o0p2cLue9n-6cNxssTPYrIdoySUEqqH1Y9MvMFCa")
cookies = Category.create!(Cat_name:"Cookies", image_url: "http://i2.wp.com/overtimecook.com/wp-content/uploads/2016/06/cinnamon-pecan-and-cranberry-shortbread-cookies6.jpg?resize=200%2C300")
potatoes = Category.create!(Cat_name:"Potatoes", image_url: "http://i0.wp.com/overtimecook.com/wp-content/uploads/2015/10/Zaatar-Smashed-Potatoes4.jpg?resize=200%2C300")
turkey = Category.create!(Cat_name:"Turkey", image_url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR33DpswSapuIAb0rnNQMK1m2BGdwakMBSYyI4XUU31vnDxuAp9")
kugel = Category.create!(Cat_name:"Kugel", image_url: "http://toriavey.com/images/2012/05/Sweet-Lokshen-Kugel--640x480.jpg")
soup = Category.create!(Cat_name:"Soup", image_url: "http://www.kitchenstewardship.com/wp-content/uploads/2014/01/winter-soup-collage-2_thumb.jpg")
salad = Category.create!(Cat_name:"Salad", image_url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQEipj1zwYetCjp5HQB8bkS86_qvKlgb76BFBbGn1YPzHsttItv")
vegetable = Category.create!(Cat_name:"Vegetables", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAvTzh5Ivikg405_fVvY_lFl9EdJ_kITlrs8Qqp0y3vNV_J6_tdg")
fish = Category.create!(Cat_name:"Fish", image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa-mqk26aFFRKTAHZT-Or_PgnpdXduZqNJfbdg6gZwmwDcHVY7UQ")


chocolateCake = Recipe.create!(title:"Bubby's Chocolate Cake",  servings: 12, calories: 250, rating: 10, category: cake, instructions: "Put all ingredients in bowl mix until fully blended. Bake in greased 9X13 for 40 minutes.", photo_url: "http://img.huffingtonpost.com/asset/scalefit_600_noupscale/562f666d1c00002e00570a9e.jpeg")
broiledChicken = Recipe.create!(title:"1-2-3 Broiled Chicken",  servings: 4, calories: 180, rating: 8, category: chicken, instructions: "Portion chicken into 4 - 4 oz. pieces set aside. Mix remaining ingredients in ziploc bag or appropriate sized container until blended, add chicken and marinate no longer than 4 hours, broil on high or grill 7 minutes each side until centers are no longer pink.", photo_url: "http://images.huffingtonpost.com/2015-06-20-1434797673-6612373-perfectlygrilledchickenbreasts.jpg")
tunaPatties = Recipe.create!(title:"Best Tuna Patties No Eggs",  servings: 4, calories: 180, rating: 8, category: fish, instructions: "Place margarine in a heat proof bowl and micrwave on high for 1 minute. Add onion flakes and flour and mix thoroughly. Add milk, mix well, microwave on high for 4-5 minutes until thickened. Drain and mash tuna. Add 1/2 of the bread crumbs and tuna to roux, mix thoroughly. Place remaining bread crumbs on plate roll patties in bread crumbs. Fry in small amount of oil until browned. May be frozen, warm nicely in toaster oven.", photo_url: "http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2008/7/21/0/EA1204_Tuna-Croquette.jpg.rend.sni12col.landscape.jpeg")
vanillaCake = Recipe.create!(title:"Best Vanilla Pound Cake",  servings: 12, calories: 200, rating: 9, category: cake, instructions: "Mix dry ingredients until blended, add oil and mix for 1 minute, add remaining ingredients and mix until well blended. Bake in greased 9X13 at 350 degrees for 1 hour.", photo_url: "https://s-media-cache-ak0.pinimg.com/564x/ba/46/b4/ba46b4925755a6280ae8e098ee336b5d.jpg")
butternutSquashSoup = Recipe.create!(title:"Butternut Squash Soup",  servings: 6, calories: 130, rating: 2, category: soup, instructions: "Cut butternut squash in half and bake at 375 degrees face down on baking sheet for 50 minutes. Dice onion and fry on medium heat  in 4 quart pot until transparent. Scoop flesh set aside. Alternately boil cube and peel raw butternut squash boil for 30 minutes and drain.  Add flour to onion and mix thoroughly add 1 C water mix thoroughly, add remaining water, salt, pepper and consume mix, bring to a boil. Lower flame to simmer for 10 minutes. Remove from heat and blend with hand blender. Use cream to garnish.", photo_url: "http://www.eateverything.xyz/wp-content/uploads/2015/11/butternut-squash-soup-with-coconut-milk-recipe-gkh88dkjh.jpg")

chocolateCakeIngredient1 = Ingredient.create!(component: "Flour", amount:"2", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient2 = Ingredient.create!(component: "Cocoa", amount:"2/3", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient3 = Ingredient.create!(component: "Sugar", amount:"1 3/4", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient4 = Ingredient.create!(component: "Oil", amount:"2/3", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient5 = Ingredient.create!(component: "Water", amount:"1", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient6 = Ingredient.create!(component: "Eggs", amount:"3", recipe: chocolateCake)
chocolateCakeIngredient7 = Ingredient.create!(component: "Baking Powder", amount:"1/2", measurement: "tsp", recipe: chocolateCake)
chocolateCakeIngredient8 = Ingredient.create!(component: "Salt", amount:"1", measurement: "tsp", recipe: chocolateCake)
chocolateCakeIngredient9 = Ingredient.create!(component: "Vanilla", amount:"1", measurement: "tsp", recipe: chocolateCake)

broiledChickenIngredient1 = Ingredient.create!(component: "Skinless Boneless Chicken", amount:"16", measurement: "oz",recipe: broiledChicken)
broiledChickenIngredient2 = Ingredient.create!(component: "Oil", amount:"1/2", measurement: "C",recipe: broiledChicken)
broiledChickenIngredient3 = Ingredient.create!(component: "Soy Sauce", amount:"1/4", measurement: "C",recipe: broiledChicken)
broiledChickenIngredient4 = Ingredient.create!(component: "White Wine", amount:"1/4", measurement: "C",recipe: broiledChicken)
broiledChickenIngredient5 = Ingredient.create!(component: "Dry Mustard", amount:"1/2", measurement: "tsp",recipe: broiledChicken)
broiledChickenIngredient6 = Ingredient.create!(component: "Salt", amount:"1/2", measurement: "tsp",recipe: broiledChicken)
broiledChickenIngredient7 = Ingredient.create!(component: "Pepper", amount:"1/8", measurement: "tsp",recipe: broiledChicken)
broiledChickenIngredient8 = Ingredient.create!(component: "Garlic Crushed", amount:"2", measurement: "tsp",recipe: broiledChicken)

vanillaCakeIngredient1 = Ingredient.create!(component: "Flour", amount:"4", measurement: "C", recipe: vanillaCake)
vanillaCakeIngredient3 = Ingredient.create!(component: "Sugar", amount:"2", measurement: "C", recipe: vanillaCake)
vanillaCakeIngredient4 = Ingredient.create!(component: "Oil", amount:"1", measurement: "C", recipe: vanillaCake)
vanillaCakeIngredient5 = Ingredient.create!(component: "Soy Milk", amount:"1", measurement: "C", recipe: vanillaCake)
vanillaCakeIngredient6 = Ingredient.create!(component: "Eggs", amount:"6", recipe: vanillaCake)
vanillaCakeIngredient7 = Ingredient.create!(component: "Baking Powder", amount:"2", measurement: "tsp", recipe: vanillaCake)
vanillaCakeIngredient8 = Ingredient.create!(component: "Salt", amount:"1", measurement: "tsp", recipe: vanillaCake)
vanillaCakeIngredient9 = Ingredient.create!(component: "Vanilla", amount:"2", measurement: "Tbs", recipe: vanillaCake)

butternutSquashSoupIngredient1 = Ingredient.create!(component: "Butternut Squash", amount:"1", measurement: "Medium",recipe: butternutSquashSoup)
butternutSquashSoupIngredient8 = Ingredient.create!(component: "Onion", amount:"1", measurement: "Large",recipe: butternutSquashSoup)
butternutSquashSoupIngredient2 = Ingredient.create!(component: "Margarine or Oil", amount:"6", measurement: "Tbs",recipe: butternutSquashSoup)
butternutSquashSoupIngredient8 = Ingredient.create!(component: "Flour", amount:"4", measurement: "Tbs",recipe: butternutSquashSoup)
butternutSquashSoupIngredient2 = Ingredient.create!(component: "Water", amount:"6", measurement: "C",recipe: butternutSquashSoup)
butternutSquashSoupIngredient6 = Ingredient.create!(component: "Salt", amount:"2", measurement: "tsp",recipe: butternutSquashSoup)
butternutSquashSoupIngredient7 = Ingredient.create!(component: "Pepper", amount:"1/4", measurement: "C",recipe: butternutSquashSoup)
butternutSquashSoupIngredient8 = Ingredient.create!(component: "Consoume Mix", amount:"3", measurement: "Tbs",recipe: butternutSquashSoup)
butternutSquashSoupIngredient8 = Ingredient.create!(component: "Half-and-Half", amount:"1", measurement: "C",recipe: butternutSquashSoup)

tunaPattiesIngredient1 = Ingredient.create!(component: "Canned Tuna in Water", amount:"7", measurement: "oz",recipe: tunaPatties)
tunaPattiesIngredient2 = Ingredient.create!(component: "Margarine", amount:"1/2", measurement: "C",recipe: tunaPatties)
tunaPattiesIngredient3 = Ingredient.create!(component: "Dried Onion", amount:"1", measurement: "Tbs",recipe: tunaPatties)
tunaPattiesIngredient4 = Ingredient.create!(component: "Flour", amount:"2", measurement: "Tbs",recipe: tunaPatties)
tunaPattiesIngredient5 = Ingredient.create!(component: "Milk", amount:"1/2", measurement: "C",recipe: tunaPatties)
tunaPattiesIngredient8 = Ingredient.create!(component: "Bread Crumbs", amount:"4", measurement: "Tbs",recipe: tunaPatties)
tunaPattiesIngredient6 = Ingredient.create!(component: "Salt", amount:"1/4", measurement: "tsp",recipe: tunaPatties)
tunaPattiesIngredient7 = Ingredient.create!(component: "Pepper", amount:"1/8", measurement: "txp",recipe: tunaPatties)
