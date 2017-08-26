
<template>
    <!-- DASHBOARD HEADER section --> 
    <header class="topbar">
        <nav class="navbar top-navbar navbar-toggleable-sm navbar-light">
            <!-- ============================================================== -->
            <!-- Logo -->
            <!-- ============================================================== -->
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <!-- Logo icon -->
                    <b>
                        <!--You can put here icon as well // <i class="wi wi-sunset"></i> //-->
                        <!-- Dark Logo icon -->
                        <img src="/static/img/site-logo-white.png" alt="homepage" width="90" class="dark-logo" />
                        <!-- Light Logo icon -->
                        <img src="/static/img/site-logo-white.png" alt="homepage" width="90" class="light-logo" />
                    </b>
                    <!--End Logo icon -->
                </a>
            </div>
            <!-- ============================================================== -->
            <!-- End Logo -->
            <!-- ============================================================== -->
            <div class="navbar-collapse">
                <!-- ============================================================== -->
                <!-- toggle and nav items -->
                <!-- ============================================================== -->
                <ul class="navbar-nav mr-auto mt-md-0">
                    <!-- This is  -->
                    <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                    <!-- ============================================================== -->
                    <!-- ============================================================== -->
                </ul>
                <!-- ============================================================== -->
                <!-- User profile and search -->
                <!-- ============================================================== -->
                <ul class="navbar-nav my-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link text-muted waves-effect waves-dark" href="javascript:void(0)" aria-haspopup="true" aria-expanded="false"> <i class="mdi mdi-email-outline"></i>
                            <div class="notify-menu"> <span class="badge badge-danger">0</span></div>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-muted text-muted waves-effect waves-dark" href="#" id="2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="mdi mdi-bell-ring-outline"></i>
                            <div class="notify-menu"> <span class="badge badge-danger">{{notifications.length}}</span></div>
                        </a>
                        <div class="dropdown-menu mailbox dropdown-menu-right scale-up" aria-labelledby="2">
                            <ul>
                                <li>
                                    <div class="drop-title">Notifications</div>
                                </li>
                                <li>
                                    <div class="message-center">
                                        <a href="#" v-for="msg in notifications">
                                            <div class="user-img"><i class="fa fa-bolt"></i> <span class="profile-status online pull-right"></span> </div>
                                            <div class="mail-contnet">
                                                <span class="mail-desc">{{ msg }}</span> <span class="time">9:30 AM</span>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <a class="nav-link text-center" href="javascript:void(0);"> <strong>See All Notifications</strong> <i class="fa fa-angle-right"></i> </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mdi mdi-account-settings-variant" alt="user"></i></a>
                        <div class="dropdown-menu dropdown-menu-right scale-up">
                            <ul class="dropdown-user">
                                <li>
                                    <div class="dw-user-box">
                                        <div class="u-text">
                                            <h4>{{ getFullName() }}</h4>
                                            <p class="text-muted">{{email}}</p>
                                        </div>
                                    </div>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li><router-link to="/dashboard/profile"><i class="ti-user"></i>  Profile</router-link></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#" v-on:click="logout"><i class="fa fa-power-off"></i> Log Out</a></li>
                            </ul>
                        </div>
                    </li>
                    <!-- ============================================================== -->
                </ul>
            </div>
        </nav>
    </header>
    <!-- end DASHBOARD HEADER section -->
</template>

<script>
export default {
	name: 'dashboard-header',
	data: function() {
		return {
			userGUID: localStorage.getItem("userGUID"),
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            email: localStorage.getItem("email"),

            notifications: [],
		}
	},
    created: function() {
        var self = this
        self.eventHub.$on('fullNameChanged', function(data) {
            self.firstName = localStorage.getItem("firstName")
            self.lastName = localStorage.getItem("lastName")
        })
    },
    beforeDestroy: function() {
        this.eventHub.$off('fullNameChanged')
    },
    methods: {
        getFullName: function() {
            var fullName = ''
            fullName = (this.firstName && this.firstName != 'undefined') ? this.firstName : ''
            fullName = fullName + ' '
            fullName = fullName + ((this.lastName && this.lastName != 'undefined') ? this.lastName : '')
            if(fullName == ' ')
                fullName = 'No name'
            return fullName
        },
        addNewToNotificationList: function(val) {
            if(this.notifications.length >= 10)
                this.notifications.shift()
            this.notifications.push(val)
        }
    },
    sockets:{
        "deposit": function(val) {
            this.showNotification("New message from chratos", val)
            this.addNewToNotificationList(val)
        },
        "bonus": function(val) {
            this.showNotification("New message from chratos", val)
            this.addNewToNotificationList(val)
        },
        "distribution": function(val) {
            this.showNotification("New message from chratos", val)
            this.addNewToNotificationList(val)
        }
    }
}
</script>

<style scoped>
    .notify-menu {
        position: absolute;
        top: 0; right: 0;
    }
    .notify-menu span{ border-radius: 50%; }
    .topbar {
        background-color: rgb(6, 148, 216);
        position: fixed;
        width: 100%;
    }
</style>
