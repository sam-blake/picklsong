class SongsController < ApplicationController
  def create
    @song = Song.where(:video_id => params[:song][:video_id]).first_or_create(song_params)
    @active_playlist = Playlist.find(params[:playlist].to_i)
    @active_playlist.songs << @song
    respond_to do |format|
      format.html {redirect_to root_path}
      format.js
    end
  end

  def new
  end

  def destroy
    song = Song.find(params[:id])
    @id = song.id
    @playlist = Playlist.find(params[:playlist])
    songplaylist = SongPlaylist.find_by(song_id: @id, playlist_id: @playlist.id)
    SongPlaylist.destroy(songplaylist.id)
  end

  private
  def song_params
    params.require(:song).permit(:title, :video_id, :url, :thumbnail, :embed_url)
  end
end
