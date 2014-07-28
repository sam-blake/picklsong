class ResultsController < ApplicationController
  def new
  end

  def create
    @query = SongPicklr::Search.new(params[:q])
    @results = @query.query_items
    @main = @results.first
    @alternatives = @results
    @playlists = Playlist.all
    respond_to do |format|
      format.html {redirect_to root_path}
      format.js
    end
  end
end
