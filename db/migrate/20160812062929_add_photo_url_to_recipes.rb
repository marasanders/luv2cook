class AddPhotoUrlToRecipes < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :photo_url, :text
  end
end
