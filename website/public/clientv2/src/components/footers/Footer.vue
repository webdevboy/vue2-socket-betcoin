
<template>
	<!-- FOOTER section -->
	<div id="footer" class="row footer-section">
		<div class="container">
			<div class="col-md-5 copyright">
				&copy; 2017 Chratos
			</div>
			<div class="col-md-2">
				<router-link to="/index" replace>
					<img src="static/img/footer-logo.png" alt="" width="50px" />
				</router-link>
			</div>
			<div class="col-md-5 footer-menu">
				<ul>
					<li><router-link to="/index" replace>Support</router-link></li>
					<li><router-link to="/about" replace>About</router-link></li>
				</ul>
			</div>
		</div>
	</div>
	<!-- end FOOTER section -->
</template>

<script>
export default {
	name: 'footer'
}
</script>

<style scoped>

</style>
