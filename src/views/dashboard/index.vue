<template>
  <div class="dashboard-container">
    <section class="data_section">
      <header class="section_title">欢迎使用版本更新后台管理系统！</header>
    </section>
    <div class="dashboard-text">当前用户: {{ name }}</div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    }
  }

</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 20px;
      line-height: 46px;
    }
  }

  .data_section {
    padding: 20px;
    margin-bottom: 10px;

    .section_title {
      text-align: center;
      font-size: 30px;
      margin-bottom: 10px;
    }
  }

</style>
