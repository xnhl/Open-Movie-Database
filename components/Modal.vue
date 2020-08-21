<template>
  <div id="modal-wrapper" class="hide" @click=handleClick>
		<div id="modal">
			<div class="modal-poster-wrapper">
				<img class="modal-poster" :src="poster">
			</div>
			<div class="modal-info-wrapper">
				<div class="modal-info">
					<div class="modal-info-item title" v-text="full_title"></div>
				</div>
				<div class="modal-info">
					<div class="modal-info-item short" v-text="`Rated: ${rated}`"></div>
					<div class="modal-info-item short" v-text="`Duration: ${runtime.formatted}`"></div>
					<div class="modal-info-item short" v-text="`Genre: ${genre}`"></div>
					<div class="modal-info-item short" v-text="`Language: ${language}`"></div>
				</div>
				<div class="modal-info">
					<div class="modal-info-item short" v-text="actors"></div>
				</div>
				<div class="modal-info plot">
					<div class="modal-info-item" v-text="plot"></div>
				</div>
				<div class="modal-info">
					<div class="modal-info-item short" v-text="released"></div>
					<div class="modal-info-item short" v-text="`Box Office: ${boxoffice.formatted}`"></div>
					<div class="modal-info-item short" v-text="director"></div>
					<div class="modal-info-item short" v-text="production"></div>
					<div class="modal-info-item short" v-text="writer"></div>
				</div>
				<div class="modal-info">
					<div class="modal-info-item icon-wrapper">
						<img class="icon" src="/icons/imdb.svg" alt="imdb">
					</div>
					<div class="modal-info-item rating-wrapper">
						<div class="rating-fill" :style="`width: ${imdbrating.unformatted * 10}%;`"></div>
					</div>
					<div class="modal-info-item text-wrapper">
						<span class="text" v-text="`${imdbrating.formatted} `"></span>
						<span class="text number" v-text="`(${imdbvotes.formatted})`"></span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	name: 'Modal',
	props: {info: {}},
	methods: {
		handleClick: function(e) {
			let modal = document.getElementById("modal-wrapper")
			if (e.target.id == "modal-wrapper") {
				modal.classList.add("hide")
			}
		}
	},
	computed: {
		plot: function() {return this.info.Plot ? this.info.Plot : "N/A"},
		title: function() {return this.info.Title ? this.info.Title : "N/A"},
		rated: function() {return this.info.Rated ? this.info.Rated : "N/A"},
		genre: function() {return this.info.Genre ? this.info.Genre : "N/A"},
		awards: function() {return this.info.Awards ? this.info.Awards : "N/A"},
		imdbid: function() {return this.info.imdbID ? this.info.imdbID : "N/A"},
		ratings: function() {return this.info.Ratings ? this.info.Ratings : "N/A"},
		language: function() {return this.info.Language ? this.info.Language : "N/A"},
		year: function() {return this.info.Year ? parseInt(this.info.Year) : "N/A"},
		actors: function() {return this.info.Actors ? `Starring: ${this.info.Actors}` : "N/A"},
		writer: function() {return this.info.Writer ? `Writer(s): ${this.info.Writer}` : "N/A"},
		metascore: function() {return this.info.Metascore ? parseFloat(this.info.Metascore) : "N/A"},
		director: function() {return this.info.Director ? `Director: ${this.info.Director}` : "N/A"},
		released: function() {return this.info.Released ? `Released: ${this.info.Released}` : "N/A"},
		poster: function() {return this.info.Poster !== "N/A" ? this.info.Poster : "/img/placeholder.jpg"},
		production: function() {return this.info.Production ? `Production: ${this.info.Production}` : " Production: N/A"},
		full_title: function() {return this.info.Title ? `${this.info.Title} (${this.info.Year})` : "N/A"},
		imdblink: function() {return this.info.imdbID ? `https://www.imdb.com/title/${this.info.imdbID}/` : "N/A"},
		imdbvotes: function() {
			return {
				formatted: this.info.imdbVotes ? this.info.imdbVotes : "N/A",
				unformatted: this.info.imdbVotes ? parseFloat(this.info.imdbVotes.replace(/[^0-9]/gi, "")) : "N/A"
			}
		},
		boxoffice: function() {
			return {
				formatted: this.info.BoxOffice ? this.info.BoxOffice : "N/A",
				unformatted: this.info.BoxOffice ? parseFloat(this.info.BoxOffice.replace(/[^0-9.]/gi, "")) : "N/A"
			}
		},
		imdbrating: function() {
			return {
				formatted: this.info.imdbRating ? this.info.imdbRating : "N/A",
				unformatted: this.info.imdbRating ? parseFloat(this.info.imdbRating.replace(/[^0-9.]/gi, "")) : "N/A"
			}
		},
		runtime: function() {
			return {
				formatted: this.info.Runtime ? this.info.Runtime : "N/A",
				unformatted: this.info.Runtime ? parseFloat(this.info.Runtime.replace(/[^0-9]/gi, "")) : "N/A"
			}
		}
	}
}
</script>

<style lang="sass">
#modal-wrapper
	height: 100vh
	min-width: 100%
	position: fixed
	top: 0
	left: 0
	z-index: 10
	overflow: hidden
	animation: $pageFade
	@include flexCenter
	background: rgba(black, 0.75)
	#modal
		color: white
		margin: 1rem
		width: 100%
		background: #eee
		max-width: 90rem
		display: flex
		flex-wrap: wrap
		justify-content: center
		border-radius: 0.5rem
		transition: box-shadow 0.25s ease-in-out
		box-shadow: 0 0 0.5rem 0.15rem rgba(black, 0.15)
		&:hover
			box-shadow: 0 0 0.5rem 0.33rem rgba(black, 0.15)
		.modal-poster-wrapper
			min-width: 100%
			margin: 1.5rem
			min-height: 445px
			@media (min-width: 45rem)
				min-width: auto
			.modal-poster
				height: 445px
				margin: 0 auto
				max-width: 100%
				@include flexCenter
				box-sizing: content-box
				border-radius: 0.25rem
				box-shadow: 0 0 0.5rem 0.15rem rgba(black, 0.15)
		.modal-info-wrapper
			flex: 1
			display: flex
			flex-wrap: wrap
			flex-direction: column
			.modal-info
				height: auto
				width: 100%
				@include flexCenter
				&.plot
					flex: 1
					margin: 0 auto
					max-width: 50rem
					padding: 2rem 0.5rem
					transition: all 0.25s ease-in-out
					.modal-info-item
						text-indent: 0.5rem
						font-size: 1.1rem
						line-height: 1.1rem
						@media (min-width: 56rem)
							font-size: 1.5rem
							line-height: 1.5rem
				.modal-info-item
					padding: 0.25rem
					@include flexCenter
					&.title
						margin-bottom: 1.5rem
						font-size: 1.25rem
						line-height: 1.25rem
						@media (min-width: 56rem)
							font-size: 2rem
							line-height: 2rem
					&.short
						margin: 0 0.5rem
						font-size: 0.9rem
						transition: all 0.25s ease-in-out
						@media (min-width: 56rem)
							font-size: 1.1rem
					&.rating-wrapper
						flex: 1
						display: block
						padding: 0
						width: 100%
						height: 1.5rem
						border-radius: 0.5rem
						overflow: hidden
						background: desaturate(red, 66)
						.rating-fill
							height: 100%
							background: desaturate(green, 66)
					&.icon-wrapper
						.icon
							width: 3rem
							height: 3rem
							box-sizing: content-box
					&.text-wrapper
						.text
							@include flexCenter
							font-size: 1.25rem
							margin: 0 0.25rem
							&.number
								opacity: 0.5
</style>
