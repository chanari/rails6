class ApiController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ApplicationHelper

  before_action { sleep(0.5) }
  before_action :authenticate_user!
end
