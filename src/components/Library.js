import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';



class Library extends Component {
	constructor(props) {
		super(props);
		this.state = { albums: albumData };
	}

	render() {
		return (
			
			<section className='library'>
			
			{
				this.state.albums.map( (album, index) =>
					<Link to={`/album/${album.slug}`} key={index}>
					<div className="row">
					<div className="col-md-4 offset-md-4"><img  className="cover" src={album.albumCover} alt={album.title} /></div>
					
					<div className="row" id="album-title">{album.title}</div>
					
					<div className="artist">{album.artist}</div>
					<div className="songs">{album.songs.length} songs</div>
					
					</div>
					</Link>
					)
			}
			</section>
	
			);
	}
}

	export default Library;