class Api::V1::ReportsController < ApiController
  def index
    sleep 1
    data = Date::MONTHNAMES[1..12].inject({}) do |hsh, mth|
      hsh.merge(mth => ([*1..10].sample * 100))
    end

    render json: { data: data }
  end
end
