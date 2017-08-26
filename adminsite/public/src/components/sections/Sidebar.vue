<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">

                <!-- Dashboard -->
                <li class="nav-title">
                    Dashboard
                </li>
                <li class="nav-item">
                    <router-link :to="'/dashboard/home'" class="nav-link"><i class="icon-speedometer"></i> Dashboard </router-link>
                </li>

                <!-- User Management -->
                <li class="nav-title">
                    User Management
                </li>
                <li class="nav-item">
                    <router-link :to="'/dashboard/users'" class="nav-link"><i class="icon-people"></i> Users </router-link>
                </li>


                <!-- Earning Management -->
                <li class="nav-title">
                    Earning Management
                </li>
                <li class="nav-item">
                    <router-link :to="'/dashboard/earnings'" class="nav-link"><i class="icon-docs"></i> Earnings </router-link>
                </li>

                <!--  <li class="nav-item">
                <router-link :to="'/dashboard/profile'" class="nav-link"><i class="icon-user"></i> User Profile </router-link>
                </li>
                <li class="nav-item">
                <router-link :to="'/dashboard/deposits'" class="nav-link"><i class="icon-docs"></i> Deposits </router-link>
                </li> -->


                <!-- Extras -->
                <li class="nav-title">
                    Extras
                </li>
                <li class="nav-item">
                    <router-link :to="'/login'" class="nav-link"><i class="icon-people"></i> Log out </router-link>
                </li>

            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    methods: {
        handleClick (e) {
            e.preventDefault()
            e.target.parentElement.classList.toggle('open')
        }
    }
}
</script>

<style lang="css">
    .nav-link {
        cursor:pointer;
    }
</style>
