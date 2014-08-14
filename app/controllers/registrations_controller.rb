class RegistrationsController < Devise::RegistrationsController
  def create
    build_resource(sign_up_params)
    binding.pry
    if resource.save
      super
    else
     flash.now[:alert] = "FAILURE!!!"
     respond_to do |format|
      format.js
     end
    end
  end
end