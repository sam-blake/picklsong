module WelcomeHelper
  # Devise forms call helpers which are specified by Devise.
  # These helpers aren't present when you access a Devise form from a non-Devise controller, so we need to add them.

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
