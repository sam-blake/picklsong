module SongPicklr
  class Search

    def initialize(user_query)
      @user_query = user_query
    end

    def query
      @query = despacer(@user_query)
    end

    def youtube_query
      results = RestClient.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=#{query}+karaoke&key=#{ENV['API_KEY']}&maxResults=15")
      JSON.parse(results)
    end

    def query_items
      youtube_query["items"].map do |query|
        Result.new(query)
      end
    end

    def despacer(query)
      query.gsub(/\s/, "+")
    end
  end
end
