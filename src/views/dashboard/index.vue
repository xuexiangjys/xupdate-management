<template>
  <div class="dashboard-container">
    <section class="data_section">
      <header class="section_title">欢迎使用版本更新管理系统！</header>
    </section>
    <div class="dashboard-text">当前用户: {{ name }}</div>
  </div>
</template>

<script>
  import Driver from 'driver.js' // import driver.js
  import 'driver.js/dist/driver.min.css' // import driver.js css
  import steps from './steps'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name',
        'isFirstRun'
      ])
    },
    data() {
      return {
        driver: null
      }
    },
    mounted() {
      this.guide();
    },
    methods: {
      guide() {
        if (this.isFirstRun === true) {
          this.$store.dispatch('app/hasShowGuide');
          this.driver = new Driver({
            doneBtnText: '知道了', // Text on the final button
            closeBtnText: '关闭', // Text on the close button for this step
            nextBtnText: '继续', // Next button text for this step
            prevBtnText: '返回'
          });
          this.driver.defineSteps(steps);
          this.driver.start();
        }
      }
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
