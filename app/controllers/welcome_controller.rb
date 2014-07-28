class WelcomeController < ApplicationController
  def index
    @playlists = Playlist.all
    @query = SongPicklr::Search.new("push it")
    @results = @query.query_items
    @main = @results.first
  end
end
