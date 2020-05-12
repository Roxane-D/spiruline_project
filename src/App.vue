<template>
    <div id="app">
        <img class="logo" alt="Vue logo" src="./assets/spiruline.png">
        <div class="btn">
            <h1>Make your choice</h1>
            <router-link to="/list">
                <button class="btn btn-success" @click="onSuppliersListClick()">Suppliers List</button>
            </router-link>
            <router-link to="/map">
                <button class="btn btn-success" @click="onMapClick()">Display Map</button>
            </router-link>
            <label for="suppliers-filter"></label>
            <select id="suppliers-filter" class="form-control" v-model="checkStock">
                <option value="ok">In stock</option>
                <option value="notok">Out stock</option>
                <option value="all">All stock</option>
            </select>
            <router-view :suppliers="filteredSuppliers"></router-view>
        </div>
        <h4 class="load" v-if="loading">Loading...</h4>
        <h4 class="error" v-if="error !=null">{{error}}</h4>
    </div>
</template>


<script>

    import axios from "axios";

    export default {
        name: 'App',
        data: function () {
            return {
                suppliers: [],
                loading: true,
                error: null,
                checkStock: 'all'
            }
        },
        methods: {
            onSuppliersListClick: function () {
                alert('suppliers list')
            },
            onMapClick: function () {
                alert('display map')
            }
        },
        created: function () {
            setTimeout(() => {
                    axios.get('https://api-suppliers.herokuapp.com/api/suppliers')
                        .then(success => {
                            this.suppliers = success.data
                        })
                        .catch(() => this.error = "Loading error")
                        .then(() => this.loading = false)
                },
                2000)
        },
        computed: {
            filteredSuppliers: function () {
                if (this.checkStock === 'ok') {
                    return this.suppliers.filter(supplier => supplier.status === true)
                } else if (this.checkStock === 'notok') {
                    return this.suppliers.filter(supplier => supplier.status === false)
                }
                return this.suppliers
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        display: flex;
        flex-direction: column;
    }

    .logo {
        width: 20%;
        height: auto;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 15px;
    }

    button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .form-control {
        width: 80px;
    }

    .load {
        color: orangered;
    }

    .error {
        color: darkred;
    }
</style>
