<template>
  <div id="wrapper">
		<div id="intro-wrapper">
			<p class="intro-wrapper-text">Use the search box to browse the media in the library of the Internet Movie Database (IMDb)</p>
		</div>
		<div id="media-items">
			<Search @search="handleSearch" />
			<MediaItem @showModal="modal" v-for="(item, index) in items" :key="index" :info="item" :data-index="index" />
		</div>
		<p id="next" class="hide" @click="load" v-text="`Page ${page}`"></p>
		<p id="end" class="hide">End of Results</p>
		<p id="none" class="hide">No results found. Try another search.</p>
		<Modal :info="single" />
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import Search from '@/components/Search'
import MediaItem from '@/components/MediaItem'
export default {
  components: {Search, MediaItem, Modal},
	data() {
		return {
			response: null,
			single: {
				Title: "Guardians of the Galaxy Vol. 2",
				Year: "2017",
				Rated: "PG-13",
				Released: "05 May 2017",
				Runtime: "136 min",
				Genre: "Action, Adventure, Comedy, Sci-Fi",
				Director: "James Gunn",
				Writer: "James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)",
				Actors: "Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel",
				Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
				Language: "English",
				Country: "USA",
				Awards: "Nominated for 1 Oscar. Another 15 wins & 56 nominations.",
				Poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
				Ratings: [
					{
						Source: "Internet Movie Database",
						Value: "7.6/10"
					},
					{
						Source: "Rotten Tomatoes",
						Value: "85%"
					},
					{
						Source: "Metacritic",
						Value: "67/100"
					}
				],
				Metascore: "67",
				imdbRating: "7.6",
				imdbVotes: "545,424",
				imdbID: "tt3896198",
				Type: "movie",
				DVD: "22 Aug 2017",
				BoxOffice: "$389,804,217",
				Production: "Walt Disney Pictures",
				Website: "N/A",
				Response: "True"
			},
			items: [],
			page: 2
		}
	},
	methods: {
		handleSearch: async function() {
			let next = document.getElementById("next")
			let intro = document.getElementById("intro-wrapper")
			let query = document.getElementById("search-text").value
			let query_val = query !== "" ? `&s=${query}` : ""
			let year = document.getElementById("search-year").value
			let year_val = year !== "" ? `&y=${year}` : ""
			let none = document.getElementById("none")
			let response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.kee}${query_val}${year_val}`)
			let jason = await response.json()
			if (jason.Response == "True") {
				this.items = []
				this.page = 2
				none.classList.add("hide")
				intro.classList.add("hide")
				next.classList.remove("hide")
				this.items = jason.Search
			} else {
				intro.classList.add("hide")
				none.classList.remove("hide")
			}
		},
		load: async function() {
			let next = document.getElementById("next")
			let query = document.getElementById("search-text").value
			let query_val = query !== "" ? `&s=${query}` : ""
			let year = document.getElementById("search-year").value
			let year_val = year !== "" ? `&y=${year}` : ""
			let response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.kee}${query_val}${year_val}&page=${this.page}`)
			let jason = await response.json()
			let end = document.getElementById("end")
			if (jason.Response == "True") {
				next.classList.remove("hide")
				end.classList.add("hide")
				this.items = this.items.concat(jason.Search)
				this.page++
			} else {
				end.classList.remove("hide")
			}
		},
		modal: async function(e) {
			let modal = document.getElementById("modal-wrapper")
			let response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.kee}&i=${e}`)
			let jason = await response.json()
			this.single = jason
			modal.classList.remove("hide")
		}
	},
	mounted() {
		var lazyloadImages = document.querySelectorAll('.lazy')
		var imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					var image = entry.target
					image.src = image.dataset.lazysrc
					image.classList.remove('lazy')
					imageObserver.unobserve(image)
				}
			})
		})

		lazyloadImages.forEach((image) => {
			imageObserver.observe(image)
		})
	}
}
</script>

<style lang="sass">
#wrapper
	@include pageWrapper
	#next
		@include flexCenter
		width: 10rem
		padding: 0.5rem
		cursor: pointer
		background: #eee
		margin: 2rem auto
		font-size: 1.5rem
		line-height: 1.5rem
		border-radius: 0.25rem
		transition: all 0.25s ease-in-out
		box-shadow: 0 0 0.25rem 0.1rem rgba(black, 0.25)
		&:hover
			box-shadow: 0 0 0.5rem 0.1rem rgba(black, 0.33)
	#media-items
		@include flexCenter
		align-items: stretch
	#intro-wrapper
		margin: 0 auto
		min-height: 20rem
		max-width: 33rem
		@include flexCenter
		.intro-wrapper-text
			font-size: 2rem
			line-height: 2rem
			@include flexCenter
</style>
