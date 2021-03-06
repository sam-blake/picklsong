class PlaylistsController < ApplicationController
  def new
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.create!(playlist_params)
    @playlist.user = current_user
    @playlist.save
      respond_to do |format|
        format.html {redirect_to root_path}
        format.js
      end
  end

  def edit
    @playlist = Playlist.find(params[:id])
  end

  def update
    @playlist = Playlist.find(params[:id])
    @playlist.update(playlist_params)
    respond_to do |format|
      format.js
    end
  end


  def destroy
    @playlist = Playlist.destroy(params[:id])
  end

  private
  def playlist_params
    params.require(:playlist).permit(:name, :id)
  end
end
