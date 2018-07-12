<template>
  <div>
    <h1>Count: {{ counter }}</h1>

    <button @click="counter++" jest="increment-button">+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  }
}
</script>
