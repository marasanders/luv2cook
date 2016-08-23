class Recipe < ActiveRecord::Base
  validates :title, presence: true
  has_many :ingredients, dependent: :destroy
  belongs_to :category
end
