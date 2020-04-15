<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/menu">Menu</router-link> |
        <span v-if='authenticated'><router-link to="/categories">Menu Categories</router-link> | </span>
        <span v-if='authenticated'><router-link to="/items">Menu Items</router-link> | </span>
        <router-link to="/about">About</router-link> |
        <span v-if='authenticated' v-on:click='logout'><strong>Logout</strong></span>
        <span v-else v-on:click='login'><strong>Login</strong></span>
    </div>

</template>

<script>
    export default {
        name: "NavBar",
        data: function () {
            return {
                authenticated: false
            }
        },
        created () {
            this.isAuthenticated()
        },
        watch: {
            // Everytime the route changes, check for auth status
            '$route': 'isAuthenticated'
        },
        methods: {
            async isAuthenticated () {
                this.authenticated = await this.$auth.isAuthenticated()
            },
            login () {
                this.$auth.loginRedirect('/')
            },
            async logout () {
                await this.$auth.logout()
                await this.isAuthenticated()

                // Navigate back to home
                this.$router.push({ path: '/' })
            }
        }
    }
</script>

<style scoped>

    #nav {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

</style>