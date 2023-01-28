<template>
	<p class="py-10 px-6 bg-dark-yellow w-screen text-center max-[499px]:text-sm">Copyright &copy SmartGym <span>{{ year }}</span> </p>
</template>

<script>
export default {
	name: 'TheFooter',
	data() {
		return {
			year: '',
		}
	},
	mounted() {
		this.year = new Date().getFullYear()
	},
}
</script>
