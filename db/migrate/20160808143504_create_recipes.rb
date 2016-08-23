class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.decimal :servings, precision: 5, scale: 2
      t.decimal :calories, precision: 7, scale: 2
      t.decimal :rating, precision: 4, scale: 2
      t.references :category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
