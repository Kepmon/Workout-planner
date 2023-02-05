<template>
	<p class="flex items-center justify-center px-6 bg-dark-yellow w-screen h-24 text-center max-[499px]:text-sm">Copyright &copy; SmartGym &nbsp;  	
		<span>{{ year }}</span>
	</p>
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
