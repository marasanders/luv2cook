class Category < ActiveRecord::Base
   validates :Cat_name, presence: true
   has_many :recipes, dependent: :destroy
end
