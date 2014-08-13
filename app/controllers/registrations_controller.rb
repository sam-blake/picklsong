class RegistrationsController < Devise::RegistrationsController
  def create
    binding.pry
    if resource.save
      super
    else
     flash[:alert] = "FAILURE!!!"
    end
  end
end