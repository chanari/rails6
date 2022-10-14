class Api::V1::ContactsController < ApiController
  def index
    contacts = Contact.page(params[:page]).per(5)

    render json: { data: contacts, **paginate_info(contacts) }
  end

  def create
    contact = Contact.new(contact_params)
    if contact.save
      render status: 201, json: { data: '' }
    else
      render status: 422, json: { errors: contact.errors }
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :subject, :message)
  end
end
