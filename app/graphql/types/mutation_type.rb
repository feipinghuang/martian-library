# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :update_item, mutation: Mutations::UpdateItem
    field :add_item, mutation: Mutations::AddItem
    field :sign_in, mutation: Mutations::SignIn
  end
end
