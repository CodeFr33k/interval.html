<template>
    <Counter 
    ></Counter>
</template>

<script lang="ts">
import Counter from './Counter.vue';
import {
    Component,
    Vue,
} from 'vue-property-decorator';

@Component({
    components: { Counter },
})
export default class extends Vue {
    created() {
    }
};
</script>

