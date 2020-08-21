<template>
  <div class="media-item-min" :data-imdbid="imdbid" @click="showModal">
    <p class="media-item-min-title" v-text="full_title"></p>
		<div class="media-item-min-poster-wrapper">
			<img class="media-item-min-poster" :src="poster" :alt="`Poster for ${title}`">
		</div>
  </div>
</template>

<script>
export default {
  name: 'MediaItem',
	props: {info: {}},
	methods: {
		showModal: function() {
			this.$emit("showModal", this.imdbid)
		}
	},
	computed: {
		type: function() {return this.info.Type},
		title: function() {return this.info.Title ? this.info.Title : "N/A"},
		imdbid: function() {return this.info.imdbID},
		year: function() {return this.info.Year ? parseInt(this.info.Year) : "N/A"},
		full_title: function() {return this.info.Title ? `${this.info.Title} (${this.info.Year})` : "N/A"},
		poster: function() {return this.info.Poster !== "N/A" ? this.info.Poster : "/img/placeholder.jpg"},
	}
}
</script>

<style lang="sass">
.media-item-min
	flex: 1
	color: white
	margin: 0.5rem
	cursor: pointer
	min-width: 100%
	background: #eee
	@include flexCenter
	animation: $pageFade
	border-radius: 0.5rem
	text-decoration: none
	transition: box-shadow 0.25s ease-in-out
	box-shadow: 0 0 0.5rem 0.15rem rgba(black, 0.15)
	&:hover
		box-shadow: 0 0 0.5rem 0.33rem rgba(black, 0.15)
	@media (min-width: 35rem)
		min-width: 40%
		max-width: 50%
	@media (min-width: 56rem)
		min-width: 30%
	.media-item-min-title
		padding: 1rem
		min-width: 100%
		font-size: 1.5rem
		text-align: center
		line-height: 1.5rem
		@include flexCenter
	.media-item-min-poster-wrapper
		width: auto
		margin: 1.5rem
		min-height: 250px
		@media (max-width: 55rem)
			width: 100%
		.media-item-min-poster
			height: 250px
			margin: 0 auto
			padding: 0.5rem
			max-width: 100%
			background: rgba(white, 0.5)
			@include flexCenter
			box-sizing: content-box
			border-radius: 0.25rem
			box-shadow: 0 0 0.5rem 0.15rem rgba(black, 0.15)
</style>
