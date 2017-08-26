
<template>
	<div id="login-as-user">
	</div>
</template>

<script>
import router from '../../router'

export default {
	name: 'login-as-user',
	created: function() {
		if(! this.checkPermission())
			return
		this.$socket.emit('users/loginAsUser', {
			method: "post",
			GUID: this.$route.params.guid
		})
	},
	sockets: {
		"users/loginAsUser": function(val) {
			if(val.body.err == null) {
                this.saveSession(val.body.data, 3);
                router.replace( { path: "/dashboard" } );
			} else {
				router.replace({ path: '/index' })
			}
		}
	}
} 
</script>

<style scoped>
</style>
