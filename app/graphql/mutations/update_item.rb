# frozen_string_literal: true

module Mutations
  class UpdateItem < BaseMutation
    field :item, Types::ItemType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    argument :id, ID, required: true
    argument :attributes, Types::ItemAttributes, required: true

    def resolve(id:, attributes:)
      check_authentication!

      item = Item.find(id)

      if item.update(attributes.to_h)
        MartianLibrarySchema.subscriptions.trigger('itemUpdated', {}, item)
        { item: item }
      else
        { errors: item.errors }
      end
    end
  end
end
