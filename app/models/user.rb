# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable, :rememberable, :recoverable and :omniauthable
  devise :database_authenticatable, :registerable, :validatable

  include DeviseTokenAuth::Concerns::User
end
