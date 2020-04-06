<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>This is a menu page</h1>
            </div>
        </div>

        <div class="row" v-for="record in menus" :key="record.menuCategory.id">
            <div class="col">
                <h3>{{record.menuCategory.categoryTitle}}</h3>
                <hr />

                <div class="row" v-for="menuItem in record.menuItemList" :key="menuItem.id">
                    <div>
                        <div class="col">
                            <h4>{{menuItem.name}} &mdash; {{menuItem.price}}</h4>
                            <p v-if="menuItem.description">{{menuItem.description | capitalize }}</p>
                            <p v-else>&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "Menu",
        data() {
            return {
                message: '',
            };
        },
        async created() {
            await this.loadMenus();
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        methods: {
            ...mapActions(['getMenusAction']),
            async loadMenus() {
                this.message = 'Loading Menus ...';
                await this.getMenusAction();
                this.message = '';
            },
        },
        computed: {
            ...mapState(['menus']),
        },
    }
</script>

<style scoped>

h3 {
    font-family: 'Source Sans Pro',sans-serif;
    font-size: 18px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #0077a0;
}

hr {
    width: 100%;
    border-top: 3px solid;
    border-color: #f4b332;
    margin-top: 0;
    margin-bottom: 2rem;
}

h4 {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
    color: #283138;
    margin-bottom: 0;
}

</style>