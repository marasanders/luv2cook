class RecipeApi
 include HTTParty
 ENV["FOOD2FORK_KEY"] = '8839d43ca16417686535ff6e05b77f18'
 base_uri 'http://food2fork.com/api'
 default_params key: ENV["FOOD2FORK_KEY"]
 format :json

 def self.for term
 get("/search", query: { q: term})["recipes"]
 end
end
