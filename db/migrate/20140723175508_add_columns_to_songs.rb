class AddColumnsToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :thumbnail, :string
    add_column :songs, :video_id, :string
    add_column :songs, :url, :string
    add_column :songs, :embed_url, :string
  end
end
