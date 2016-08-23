class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update]

  def index
    respond_to do |format|
      format.html
      format.json{ render json: Category.all }
    end
  end

  def show
    puts "IN SHOW"
    @category = Category.find(params[:id])
    render json: @category, status: :ok
  end

  def edit
  end

  def create
    puts "create"
    @category = Category.create(category_params)
    render json: @category, status: :ok
  end

  def update
      puts "we are in update"
      @category = Category.find(params[:id])
      @category.update!(category_params)
      respond_to do |format|
        format.html
        format.json{ render json: @category}
      end
  end

  def destroy
    Category.destroy(params[:id])
    render json: {success: true}, status: :ok
  end

  private

    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:Cat_name)
    end
end
