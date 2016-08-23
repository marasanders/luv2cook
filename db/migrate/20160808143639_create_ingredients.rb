class CreateIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :ingredients do |t|
      t.string :component
      t.string :amount
      t.string :measurement
      t.string :amount2
      t.string :measurement2
      t.string :amount3
      t.string :measurement3
      t.string :amount4
      t.string :measurement4
      t.string :amount5
      t.string :measurement5
      t.references :recipe, index: true, foreign_key: true

      t.timestamps
    end
  end
end
