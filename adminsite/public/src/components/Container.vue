<template>
    <div class="app">
        <AppHeader/>
        <div class="app-body">
            <Sidebar/>
                <main class="main">
                    <div class="container-fluid">
                        <router-view></router-view>
                    </div>
                </main>
            <AppAside/>
        </div>
        <AppFooter/>
    </div>
</template>

<script>
import AppHeader from './sections/Header'
import Sidebar from './sections/Sidebar'
import AppAside from './sections/Aside'
import AppFooter from './sections/Footer'

import router from '../router'

export default {
    name: 'app',
    components: {
        AppHeader,
        Sidebar,
        AppAside,
        AppFooter
    },
    computed: {
        name () {
            return this.$route.name
        },

        list () {
            return this.$route.matched
        }
    },
    created: function () {
        this.$socket.emit("connection", {method: "get"})
        if(!("Notification" in window)) {
            console.log("This browser does not support desktop notification!")
        } else {
            if(Notification.permission == "granted") {
            } else {
                Notification.requestPermission().then(function(result) {
                    console.log("The request for desktop notification was ", result)
                })
            }
        }
    },
    sockets:{
        "connection" : function(val){
            console.log("Socket Connected!", val)
        },
        "authenticated": function(val) {
            console.log("Authenticated", val)
        },
        "unauthenticated": function(val) {
            console.log("Unauthenticated", val)
            this.clearSession()
            this.checkPermission()
        },
        "alert": function(val) {
            if(this.isNotificationEnabled()) {
            var options = {
                body: val,
                icon: '/static/img/site-logo.png',
            }
            var notification = new Notification("Chratos Alert", options)
            }
        },
        "security/logout" : function(val) {
            if(!val.body.err) {
                this.clearSession()
                router.replace( { path: "/index" } )
            } else {
                alert("Server Connection Error!")
            }
        }
    },
    // watch: {
    //   '$route': 'checkPermission'
    // }
}
</script>

