<template>
    <div class="counter">
        {{ count }}

        <div class="counter__button" @click="increment">+</div>
    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import store from './store/NotificationsStore'
    export default {
        data: function () {
            return {
                state: store.state
            };
        },
        computed: {
            count: function () {
                return this.state.count
            }
        },
        methods: {
            increment(){
                store.increment()
            }
        }
    }


</script>

<style>
    .counter{
        font-weight: bold;
        width: 20px;
        height: 20px;
        text-align: center;
    }

    .counter__button{
        border: 1px solid #000;
        padding: 2px 10px;
    }

</style>