<template>
    <div class="dashboard-container">
      {{name}}
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
      name: 'dashboard',
      computed: {
        ...mapGetters([
          'name',
          'roles'
        ])
      }
    }
</script>
