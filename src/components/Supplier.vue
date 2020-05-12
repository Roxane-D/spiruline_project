<template>
    <div>
        <h5>{{supplier.id}}</h5>
        <h1>{{supplier.name}}</h1>
        <h3 :class="{ ok: supplier.status, ko: !supplier.status}">
            <span v-if="supplier.status===true">Stock OK</span>
            <span v-else-if="supplier.status===false">Stock is not OK</span>
            <span v-else>Stock not found...</span>
        </h3>
        <button class="btn btn-warning" @click="toggleStatus">Change stock</button>
        <h5>Last inventory check : {{displayDate}}</h5>
    </div>
</template>

<script>
    import {format} from 'timeago.js';


    export default {
        props: {
            supplier: Object
        },
        computed: {
            displayDate: function () {
                return format(this.supplier.checkedAt)
            }
        },
        methods: {
            toggleStatus: function() {
                this.supplier.status = !this.supplier.status;
            }
        }
    }
</script>

<style scoped>
    .ok {
        color: darkgreen;
    }

    .ko {
        color: darkred;
    }
</style>