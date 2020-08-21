<template>
	<div id="search">
		<input id="search-text" type="text" name="search" placeholder="Search...">
		<input id="search-year" type="number" name="year" min="1894" max="2020" placeholder="2020">
		<div id="search-icon-wrapper" @click="search">
			<img id="search-icon" src="/icons/search.svg" alt="search">
		</div>
	</div>
</template>

<script>
export default {
	name: 'Search',
	data() {
		return {
			scroll_old: 0,
			scroll_new: 0,
			page: 2
		}
	},
	methods: {
		search: async function() {
			this.$emit("search")
		},
		handleScroll: function() {
			let y = window.scrollY
			this.scroll_new = y
			let search_wrapper = document.getElementById("search")
			if (this.scroll_new > this.scroll_old) {
				search_wrapper.classList.add("hidden")
				this.scroll_old = y
			} else if (this.scroll_new < this.scroll_old) {
				search_wrapper.classList.remove("hidden")
				this.scroll_old = y
			}
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll)
	}
}
</script>

<style lang="sass">
#search
	top: 0
	left: 0
	z-index: 5
	position: fixed
	min-width: 100%
	background: #eee
	@include flexCenter
	transition: all 0.25s ease-in-out
	box-shadow: 0 0 0.5rem 0.1rem rgba(black, 0.25)
	&.hidden
		top: -5rem
	#search-text
		width: 10rem
		font-size: 1.25rem
		margin: 0.5rem
		padding: 0.25rem
		border-radius: 0.25rem
		border: 0rem solid rgba(white, 0)
		box-shadow: 0 0 0.25rem 0.1rem rgba(black, 0.25)
	#search-year
		margin: 0.5rem
		font-size: 1.25rem
		padding: 0.25rem
		border-radius: 0.25rem
		border: 0rem solid rgba(white, 0)
		box-shadow: 0 0 0.25rem 0.1rem rgba(black, 0.25)
	#search-icon-wrapper
		cursor: pointer
		margin-left: 0.5rem
		border-radius: 0.25rem
		box-shadow: 0 0 0.25rem 0.1rem rgba(black, 0.25)
		&:hover
			#search-icon
				transform: scale(1.25)
		#search-icon
			width: 1.5rem
			height: 1.5rem
			padding: 0.33rem
			box-sizing: content-box
			transition: transform 0.1s ease-in-out
	#search-filter
		@include flexCenter
		.search-filter-item
</style>
