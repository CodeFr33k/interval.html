<template>
    <div class="counter-box">
        <div class="count">
            {{ parseInt(interval.value) }}
        </div>
        <button
            v-if="interval.state === 'paused'"
            class="pause-button"
            @click="unpause"
        >UNPAUSE</button>
        <button
            v-if="interval.state === 'unpaused'"
            class="pause-button"
            @click="pause"
        >PAUSE</button>
    </div>
</template>

<script lang="ts">
import startInterval from './startInterval';
import { Observer } from 'mobx-vue';
import {
    Component,
    Vue,
} from 'vue-property-decorator';

const defaultTimeout = 5;

function getTimeout(): number {
    const searchParams = new URLSearchParams(
        window.parent.location.search as string
    );                          
    const interval = searchParams.get('interval');
    if(!interval) {
        return defaultTimeout;
    }
    const timeout = parseInt(interval);
    if(!timeout) {
        return defaultTimeout;
    }
    return timeout;
}

@Observer
@Component
export default class extends Vue {
    interval!: any; 
    created(): void {
        const timeout = getTimeout();
        this.resizeParentWindow();
        this.interval = startInterval(
            this.callback.bind(this),
            timeout
        );
    }
    callback(): void {
        try {
            const parent = window.parent as any;
            parent.store.addReducer((records: any) => { return records; });
        } catch(e) {
            console.error(e);
        }
    }
    resizeParentWindow(): void {
        try {
            const parent = window.parent as any;
            parent.document.getElementsByTagName('iframe')[0].style.height = '50px';
        } catch(e) {
            console.error(e);
        }
    }
    pause() {
        this.interval.pause();
    }
    unpause() {
        this.interval.unpause();
    }
}
</script>

<style lang="sass">
@import './common.sass'

.counter-box
    display: flex
    align-items: right
    width: 100%

.count
    font-size: 32px
    flex: 1
    text-align: right
    padding:  0 15px

.pause-button
    width: 100px
    border: 1px solid black
    border-radius: 2px

.pause-button:hover
    cursor: pointer

</style>

