class IngredientsController < ApplicationController
  before_action :set_ingredient, only: [:show, :edit, :update]

  def index
    @recipe = Recipe.find(params[:recipe_id])
    respond_to do |format|
      format.html
      format.json{ render json: @recipe.ingredients }
    end
  end

  def show
    @ingredient = Ingredient.find(params[:id])
    render json: @ingredient, status: :ok
  end

  def edit
  end

  def create
    @recipe = Recipe.find(params[:recipe_id])
    @ingredient = @recipe.ingredient.create(ingredient_params)
    render json: @ingredient, status: :ok
  end

  def update
    @ingredient = Ingredient.find(params[:id])
    binding.pry
    @ingredient.update(ingredient_params)
    respond_to do |format|
      format.html
      format.json{ render json: @ingredient}
    end
  end

  def destroy
    Ingredient.destroy(params[:id])
    render json: {success: true}, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ingredient
      @ingredient = Ingredient.find(params[:id])
    end

    def set_recipe
      @recipe = Recipe.find(params[:recipe_id])
    end

    def set_Category
      @category = Category.find(params[:category_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ingredient_params
      params.require(:ingredient).permit(:message)
    end
end
