class WelcomeController < ApplicationController
  def index
    @playlists = Playlist.all
    @query = SongPicklr::Search.new("lyrics")
    @results = @query.query_items
    # Choose a song from first 15 results randomly
    @main = @results.sample
  end
end
