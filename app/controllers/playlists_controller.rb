class PlaylistsController < ApplicationController
  def new
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.create!(playlist_params)
      respond_to do |format|
        format.html {redirect_to root_path}
        format.js
      end
  end

  def edit
  end

  def update
  end

  def destroy
    @playlist = Playlist.destroy(params[:id])
  end

  private
  def playlist_params
    params.require(:playlist).permit(:name, :id)
  end
end
