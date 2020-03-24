# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: false
    field :full_name, String, null: false

    def full_name
      [object.first_name, object.last_name].join(' ')
    end
  end
end
