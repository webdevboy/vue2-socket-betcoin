
<template>
	<!-- TOP MENU section -->
	<aside id="menu" class="left-sidebar">
        <!-- Sidebar scroll-->
        <div class="scroll-sidebar">
            <!-- Sidebar navigation-->
            <nav class="sidebar-nav">
                <ul id="sidebarnav">
                    <li class="nav-small-cap">PERSONAL</li>                    
                    <li class="nav-menu active">
                        <router-link to="/dashboard" class="nav-toggler" replace>
                            <i class="fa fa-home"></i>
                            Dashboard
                        </router-link>
                    </li>
                    <li class="nav-menu">
                        <router-link to="/dashboard/profile" class="nav-toggler" replace>
                            <i class="fa fa-user"></i>
                            Profile
                        </router-link>
                    </li>
                    <li class="nav-menu">
                        <router-link to="/dashboard/trade" class="nav-toggler" replace>
                            <i class="fa fa-recycle"></i>
                            Trade
                        </router-link>
                    </li>
                    <li class="nav-menu">
                        <router-link to="/dashboard/buy" class="nav-toggler" v-on:click="selectRoute('buy')" replace>
                            <i class="fa fa-shopping-cart"></i>
                            Buy Now
                        </router-link>
                    </li>
                    <li class="nav-menu">
                        <router-link to="/dashboard/reports" class="nav-toggler" replace>
                            <i class="fa fa-file-text"></i>
                            Reports
                        </router-link>
                    </li>
                    <li class="nav-menu">
                        <router-link to="/dashboard/leader-board" class="nav-toggler" replace>
                            <i class="fa fa-users"></i>
                            Leader Board
                        </router-link>
                    </li>
                </ul>
            </nav>
            <!-- End Sidebar navigation -->
        </div>
        <!-- End Sidebar scroll-->
    </aside>
	<!-- end TOP MENU section -->
</template>

<script>
export default {
	name: 'menu',
    data: function() {
        return {
        }
    },
    methods: {
    },
    mounted: function(){
		$(".nav-menu").on('click', function () {
			$(".nav-menu").removeClass("active");
			$(this).addClass("active");
		});
	}
}
</script>

<style scoped>
    #sidebarnav { padding: 0px 10px; }
</style>
