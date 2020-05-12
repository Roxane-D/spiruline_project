<template>
    <div>
        <h2>Supplier Map</h2>
        <div>
            <div v-if="errorStr">
                Sorry, but the following error
                occurred: {{errorStr}}
            </div>
            <div v-if="gettingLocation">
                <i>Getting your location...</i>
            </div>
            <div v-if="location">
                Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
            </div>
        </div>

        <div style="height: 80vh">
            <LMap :zoom="zoom" :center="center">
                <LTileLayer :url="url"></LTileLayer>
<!--                <LMarker :lat-lng="[47.413220, -1.219482]"></LMarker>-->
<!--                <LMarker :lat-lng="[46.193220, 4.82]"></LMarker>-->
<!--                <LMarker :lat-lng="[45.193220, 6.82]"></LMarker>-->
<!--                <LMarker :lat-lng="[47.03220, -0.9482]"></LMarker>-->
<!--                <LMarker :lat-lng="[46.03220, 2.9482]"></LMarker>-->
                <LMarker v-for="supplier in suppliers" :key="supplier.id"
                         :lat-lng="[supplier.latitude, supplier.longitude]">
                </LMarker>
            </LMap>
        </div>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker} from "vue2-leaflet";

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LMarker
        },
        data() {
            return {
                url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
                zoom: 6,
                center: [46.5322, 2.9482],
                bounds: null,
                location: null,
                gettingLocation: false,
                errorStr: null,

            };
        },
        props: {
            suppliers: Array,
            loading: Boolean,
            error: null,
        },
        created: function () {
            if (!("geolocation" in navigator)) {
                this.errorStr = 'Geolocation is not available.';
                return;
            }
            this.gettingLocation = true;
            navigator.geolocation.getCurrentPosition(pos => {
                this.gettingLocation = false;
                this.location = pos;
                this.center = [pos.coords.latitude, pos.coords.longitude]
            }, err => {
                this.gettingLocation = false;
                this.errorStr = err.message;
            })
        }
    };
</script>

<style scoped>

</style>