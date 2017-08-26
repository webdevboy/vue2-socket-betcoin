
<template>
    <!-- DASHBOARD HEADER section -->
    <div id="dashboard-header" class="horizontal-menu-page">

        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="chratos-menubar">
                    <ul class="nav navbar-nav">
                        <img src="/static/img/site-logo.png" class="img-logo" />
                    </ul>
                    <ul class="nav navbar-nav">
                        <li>
                            <router-link to="/dashboard" data-toggle="dropdown" replace>
                                <i class="fa fa-home"></i>
                                Dashboard
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/dashboard/profile" data-toggle="dropdown" replace>
                                <i class="fa fa-user"></i>
                                Profile
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/dashboard/trade" data-toggle="dropdown" replace>
                                <i class="fa fa-recycle"></i>
                                Trade
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/dashboard/buy" data-toggle="dropdown" replace>
                                <i class="fa fa-shopping-cart"></i>
                                Buy Now
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/dashboard/reports" data-toggle="dropdown" replace>
                                <i class="fa fa-file-text"></i>
                                Reports
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/dashboard/leader-board" data-toggle="dropdown" replace>
                                <i class="fa fa-users"></i>
                                Leader Board
                            </router-link>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="#" class="info-number" data-toggle="dropdown">
                                <i class="fa fa-envelope-o"></i>
                                <span class="badge">0</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="info-number" data-toggle="dropdown">
                                <i class="fa fa-bell-o"></i>
                                <span class="badge">{{notifications.length}}</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-head pull-right" v-if="notifications.length > 0">
                                <h5 class="title">Notifications</h5>
                                <ul class="dropdown-list normal-list">
                                    
                                    <li class="new" v-for="msg in notifications">
                                        <a href="">
                                            <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                            <span class="name"> {{ msg }}  </span>
                                        </a>
                                    </li>

                                    <li class="new"><a href="">See All Notifications</a></li>
                                
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="#" data-toggle="dropdown">
                                <i class="fa fa-user user-icon"></i>
                                <span class="user-name">
                                    &nbsp;{{ getFullName() }}
                                    <span class="caret"></span>
                                </span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
                                <li><router-link to="/dashboard/profile"><i class="fa fa-user"></i>  Profile</a></router-link>
                                <li><a href="#" v-on:click="logout"><i class="fa fa-sign-out"></i> Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>

    </div>
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
    .no-background { background: none; }

    #dashboard-header { position: fixed; top: 0px; margin: 0; width: 100%; min-height: 80px; z-index: 100; background: #124c7d;  
        background-image: url(/static/img/bg-dots.jpg); background-size: cover; background-repeat: no-repeat; background-position: center; }
    #dashboard-header::after{ clear: both; display: block; content: ''; }
    #chratos-menubar { margin-top: 15px; }
    
    .img-logo { width: 80px; margin-left: 20px; margin-right: 30px; }


    .horizontal-menu-page .navbar { margin-bottom: 0; }
    .horizontal-menu-page .navbar-brand { padding: 5px 15px; min-height: 50px; }
    .horizontal-menu-page .navbar-default { background: none; border: none; border-radius: 0; }

    .horizontal-menu-page .navbar-default .navbar-collapse,
    .horizontal-menu-page .navbar-default .navbar-form {
        border-color: #2A323F;
    }

    .horizontal-menu-page .navbar-default .navbar-nav > li > a { color: #FFFFFF; font-size: 13px; }

    .horizontal-menu-page .navbar-default .navbar-nav > .active > a,
    .horizontal-menu-page .navbar-default .navbar-nav > .active > a:hover,
    .horizontal-menu-page .navbar-default .navbar-nav > .active > a:focus,
    .horizontal-menu-page .navbar-default .navbar-nav > .open > a,
    .horizontal-menu-page .navbar-default .navbar-nav > .open > a:hover,
    .horizontal-menu-page .navbar-default .navbar-nav > .open > a:focus,
    .horizontal-menu-page .navbar-default .navbar-nav > li > a:hover,
    .horizontal-menu-page .navbar-default .navbar-nav > li > a:focus {
        background: none;
        color: #FFFF00;
    }

    .horizontal-menu-page .dropdown-menu { background-color: #0468BA; color: #fff; box-shadow: none; border: none; }
    .horizontal-menu-page .dropdown-menu:after {
        border-bottom: 6px solid #0468BA;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        content: "";
        display: inline-block;
        right: 10px;
        position: absolute;
        top: -6px;
    }
    .horizontal-menu-page .dropdown-menu > li > a { color: #fff; padding: 10px 20px; font-size: 12px; }

    .horizontal-menu-page .navbar-default .navbar-nav .open .dropdown-menu > li > a { color: #fff; } 

    .horizontal-menu-page .dropdown-menu > li > a:hover,
    .horizontal-menu-page .dropdown-menu > li > a:focus,
    .horizontal-menu-page .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover { 
        background-color: #0360B0;
        color: #FFFF00; 
        text-decoration: none; 
    }

    /*.horizontal-menu-page .navbar-default .navbar-toggle { border-color: #2A323F; } 
    .horizontal-menu-page .navbar-default .navbar-toggle .icon-bar { background-color: #2A323F; }
    .horizontal-menu-page .navbar-default .navbar-toggle:hover,
    .horizontal-menu-page .navbar-default .navbar-toggle:focus {
        background-color: #FFFFFF;
        border-color: #FFFFFF !important;
    }*/

    .info-number .badge { background: #FF6C60; border-radius: 2px; -webkit-border-radius: 2px; font-size: 10px; font-weight: normal; line-height: 13px;
        padding: 2px 5px; position: absolute; right: 4px; top: 10px; }

    .dropdown-list li { padding: 15px; overflow: hidden; border-bottom: 1px solid #eee; }
    .dropdown-list li:last-child { border-bottom: 0; }
    .dropdown-list .thumb { width: 36px; float: left; }
    .dropdown-list .thumb img { width: 100%; display: block; vertical-align: middle; }
    .dropdown-list .desc { margin-left: 45px; display: block; }
    .dropdown-list .desc h5 { font-size: 13px; margin-top: 7px; }
    .dropdown-list li:last-child { padding: 10px 15px; }
    .dropdown-list li .badge { float: right; }

    .normal-list li a .label i { margin-right: 0; }
    .normal-list li a span.label { float: left; margin-right: 10px; padding: 5px; width: 20px; }
    .normal-list li a:hover { color: #0468ba !important; text-decoration: none; }
    .normal-list li .name { font-size: 13px; font-family: 'Arial' Helvetica, sans-serif; line-height: 21px; }
    .normal-list li .msg { font-size: 12px; line-height: normal; color: #999; display: block; }

    .horizontal-menu-page .dropdown-menu-head { background: #fff }
    .horizontal-menu-page .dropdown-menu-head { padding: 0; min-width: 300px; }
    .horizontal-menu-page .dropdown-menu-head .title { background: #0468BA; color: #fff; padding: 15px; text-transform: uppercase; font-size: 12px; margin: 0; }
    .horizontal-menu-page .dropdown-menu-head ul { border: 1px solid #ddd; border-top: 0; padding: 0; }
    .horizontal-menu-page .dropdown-menu-head li a { color: #333; padding: 0; opacity: 1; }
    .horizontal-menu-page .dropdown-menu-head li a:hover { background: none; color: #0468BA !important; text-decoration: none; }

    .horizontal-menu-page .dropdown-menu-usermenu { background: #0468BA; min-width: 200px; }
    .horizontal-menu-page .dropdown-menu-usermenu li { padding: 0; }
</style>
