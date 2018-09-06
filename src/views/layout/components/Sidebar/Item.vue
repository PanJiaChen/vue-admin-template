<template>
  <div>
    <svg-icon v-if="icon" :name="icon"/>
    <span v-if="title" slot="title">{{title}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MenuItem extends Vue {
  @Prop({ default: '' }) icon!: string;
  @Prop({ default: '' }) title!: string;
}
</script>
