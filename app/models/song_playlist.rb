class SongPlaylist < ActiveRecord::Base
  belongs_to :song
  belongs_to :playlist
  validates :song_id, uniqueness: {scope: :playlist_id}
end
