module ApplicationHelper
  def randomized_background_image
    # images = ["assets/foo.jpg", "assets/random.jpg", "assets/super_random"]
    images = [image_url("crowd-background.jpg"), image_url("carefree-background.jpg")]
    images[rand(images.size)]
  end
end
