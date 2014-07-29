class WelcomeController < ApplicationController
  def index
    if current_user
      @playlists = current_user.playlists
    end
    @query = SongPicklr::Search.new("push it")
    @results = @query.query_items
    @main = @results.first
  end
end
