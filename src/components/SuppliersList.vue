<template>
    <div class="section">
        <h2>Suppliers List</h2>

        <div class="suppliers">
            <Supplier class="supplier" v-for="supplier in suppliers"
                      :key="supplier.id"
                      :supplier="supplier">
            </Supplier>
        </div>
    </div>
</template>

<script>
    import Supplier from "./Supplier.vue";

    export default {
        components: {
            Supplier
        },
        props: {
            suppliers: Array,

        },
    }

</script>

<style scoped>
    .section {
        display: flex;
        flex-direction: column;
    }

    .suppliers {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .supplier {
        border: solid 2px #2c3e50;
        margin-bottom: 15px;
        width: 700px;
        height: auto;
    }

    h2 {
        margin-bottom: 30px;
    }

</style>