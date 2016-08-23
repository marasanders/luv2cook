class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update]

  def index
    @category = Category.find(params[:category_id])
    respond_to do |format|
      format.html
      format.json{ render json: @category.recipes }
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe, status: :ok
  end

  def edit
  end

  def create
    puts "in create"
    @category = Category.find(params[:category_id])
    @recipe = @category.recipes.create!(recipe_params)
    render json: @recipe, status: :ok
  end

  def update
    @recipe = Recipe.find(params[:id])
    # binding.pry
    @recipe.update(recipe_params)
    respond_to do |format|
      format.html
      format.json{ render json: @recipe}
    end
  end

  def destroy
    Recipe.destroy(params[:id])
    render json: {success: true}, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def set_Category
      @category = Category.find(params[:category_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def recipe_params
      params.require(:recipe).permit(:title, :servings, :calories, :ratings, :category_id, :instructions, :photo_url)
    end

end
