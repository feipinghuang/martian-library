# frozen_string_literal: true

module Mutations
  class SignIn < BaseMutation
    field :token, String, null: true
    field :user, Types::UserType, null: true

    argument :email, String, required: true

    def resolve(email:)
      user = User.find_by!(email: email)
      return {} unless user

      token = Base64.encode64(user.email)
      {
        token: token,
        user: user
      }
    end
  end
end
