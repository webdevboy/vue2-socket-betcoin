
<template>
	<!-- GUESTS HEADER section -->
	<div id="guests-header">
		<header class="topheader full-width" id="top">
			<div class="fix-width">
				<nav class="navbar navbar-toggleable-md navbar-light p-l-0">
					<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
					<!-- Logo will be here -->
					<a class="navbar-brand" href="#">
						<img class="navbar-logo" src="/static/img/site-logo-blue.png" width="90px" alt="" />
					</a>
					<!-- This is the navigation menu -->
					<div class="collapse navbar-collapse" id="navbarNavDropdown">
						<ul class="navbar-nav ml-auto stylish-nav">
							<li class="nav-item"><router-link class="nav-link" to="/about" replace><i class="mdi mdi-earth"></i> About</router-link></li>
							<li class="nav-item"><router-link class="nav-link" to="/faq" replace><i class="mdi mdi-account-alert"></i> Support</router-link></li>
							<li class="nav-item"><router-link class="nav-link" to="/login" replace><i class="mdi mdi-account"></i> Login</router-link> </li>
							<li class="nav-item"> <router-link class="nav-link" to="/register" replace><i class="mdi mdi-account-plus"></i> Register</router-link> </li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	</div>
	<!-- end GUESTS HEADER section -->
</template>

<script>
export default {
	name: 'guests-header'
}
</script>

<style scoped>
	.topheader {
		background: white;
        height: 4rem;
        box-shadow: 0px 0px 20px 0px rgba(0,23,92,0.8);
    }
    .navbar {
        padding: 0px;
    }
    .navbar-toggler {
        margin-top: 0.7rem;
    }
    .navbar-collapse { z-index: 9;  }
    .navbar-brand {
        font-size: 2em;
        color: rgb(6, 148, 216);
        text-shadow: 1px 1px 0px rgba(180, 148, 216, 1);
        font-weight: 700;
        height: 4rem;
        line-height: 3.2rem;
    }
	.navbar-brand:hover { color: rgb(6, 148, 216); }
    .nav-item > a.nav-link {
        color: rgb(17, 77, 130); 
        font-weight: 400;
        text-shadow: 1px 0px 0px rgba(121, 121, 121, 1);
        padding: 1rem;
    }
    .nav-item > a.nav-link:hover { color: rgba(6, 148, 216, 1); }
</style>
