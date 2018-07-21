import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

var sectionStyle = {
	width: "100%",
	height: "400px",
	backgroundImage: 'url(${Background})'
}

class Album extends Component {
	constructor(props) {
		super(props);

		const album = albumData.find ( album => {
			return album.slug === this.props.match.params.slug
		});

		this.state = {
			album: album,
			currentSong: album.songs[0],
			duration: album.songs[0].duration,
			currentTime: 0,
			isPlaying: false, 
			volume: 0,
			hover: false
		};

		this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
	}

		componentDidMount() {
			this.eventListeners = {
				timeupdate: e => {
					this.setState({ currentTime: this.audioElement.currentTime });
			},
				durationchange: e => {
					this.setState({ duration: this.audioElement.duration });
				},
				volumechange: e => {
					this.setState({ volume: this.audioElement.volume});
				}
			};
			this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
			this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
			this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
		}

		componentWillUnmount() {
			this.audioElement.src = null;
			this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
			this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
		}

	play() {
		this.audioElement.play();
		this.setState({ isPlaying: true });
	}

	pause() {
		this.audioElement.pause();
		this.setState({ isPlaying: false});
	}

	setSong(song) {
		this.audioElement.src = song.audioSrc;
		this.setState({ currentSong: song });
	}

	handleSongClick(song) {
		const isSameSong = this.state.currentSong === song;
		if (this.state.isPlaying && isSameSong) {
			this.pause();
		} else {
			if (!isSameSong) { this.setSong(song); }
			this.play();
		}
	}

	handlePrevClick(){
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const newIndex = Math.max(0, currentIndex -1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
	}

	handleNextClick(){
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		if (currentIndex !== this.state.album.songs.length-1){
		const newIndex = Math.max(currentIndex + 1);
		const newSong = this.state.album.songs[newIndex];
		this.setSong(newSong);
		this.play();
	 }
	}

	handleTimeChange(e) {
		const newTime = this.audioElement.duration * e.target.value;
		this.audioElement.currentTime = newTime;
		this.setState({ currentTime: newTime });
	}

	formatTime(time){
		const mins = Math.floor(time / 60);
		const secs = parseInt((time % 60), 10);
		if (secs < 10) {
			return "0:0" + secs;
		}
		else if (time === undefined) {
			return "-:--";
		}else {
			return mins + ":" + secs;
		}
	}

	handleVolumeChange(e) {
		const newVolume = e.target.value /1;
		this.audioElement.volume = newVolume;
		this.setState({ volume: newVolume });
	}


	mouseHoverYes(song){
		this.setState( {hover: song});
	}

	mouseHoverNo(song){
			this.setState( {hover: false});
	}
	
	onEnter(song, index){
		if (this.state.hover !== song) {
			return <td className="song-number">{index + 1}</td>
		}
		if (this.state.isPlaying && this.state.currentSong === song){
			return <td className="ion-pause"></td>
		}
		if (!this.state.isPlaying && this.state.currentSong === song) {
			return <td className="ion-play"></td>
		}
		
		else {
			return <td className="ion-play"></td>
		}
	}	



	

	render() {
		return (
			<div style={ { backgroundImage: 'url(require("images/blurred_backgrounds/blur_bg_3.jpg"))'}}>
			<section className="album">
			<section id="album-info">
			<img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
			<div className="album-details">
			 <h1 id="album-title">{this.state.album.title}</h1>
			 <h2 className="artist">{this.state.album.artist}</h2>
			 <div id="release=info">{this.state.album.releaseInfo}</div>
			</div>
			</section>
			<table id="song-list" className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
			 <thead>
			  <tr>
			   <th className="mdl-layout__drawer">
			   <th id="song-number-column" class="mdl-data-table__cell--non-numeric"/>Number</th>
			   <th id="song-title-column">Song</th>
			   <th id="song-duration-column">Time</th>
			  </tr>
			 </thead>
			 <tbody>
			  {
			  	this.state.album.songs.map((song, index) =>
			  	 <tr className="song" key={index} 
			  	 onClick={() => this.handleSongClick(song)}
			  	 onMouseEnter={() => this.mouseHoverYes(song)}
			  	 onMouseLeave={() => this.mouseHoverNo(song)} >
			  	  
			  	  {this.onEnter(song, index)}
			  	  <td className='songTitle' className="mdl-data-table mdl-js-data-table">{song.title}</td>
			  	  <td className='songDuration'>{this.formatTime(song.duration)}</td>
			  	 </tr>
			  	)
			  }
			  </tbody>
			 </table>
			 <PlayerBar 
			 isPlaying={this.state.isPlaying} 
			 currentSong={this.state.currentSong}
			 currentTime={this.audioElement.currentTime}
			 duration={this.audioElement.duration}
			 volume={this.audioElement.volume}
			 handleSongClick={() => this.handleSongClick(this.state.currentSong)}
			 handlePrevClick={() => this.handlePrevClick()}
			 handleNextClick={() => this.handleNextClick()}
			 handleTimeChange={(e) => this.handleTimeChange(e)}
			 handleVolumeChange={(e) => this.handleVolumeChange(e)}
			 formatTime={(time) => this.formatTime(time)}
			 />
			</section>
			);
	}
}
	

	export default Album;