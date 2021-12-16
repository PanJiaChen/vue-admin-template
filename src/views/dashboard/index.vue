<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24">
        <div class="chart-container container-height">
          <VeLine :data="chartData" :height="lineChartFirstHeight" :legend="lineChartLegend" :grid="lineChartGrid" :extend="lineChartExtend" :settings="lineChartSettings" :y-axis="lineChartyAxis" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    VeLine
  },
  data() {
    this.lineChartyAxis = {
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: ['#EAEAEA']
        }
      },
      axisLabel: {
        show: true,
        color: '#6F6F6F'
      },
      axisLine: {
        lineStyle: {
          color: '#D6D6D6'
        },
        show: true
      },
      axisTick: {
        show: false
      }
    }
    this.lineChartSettings = {
      itemStyle: {
        color: ({ seriesIndex }) => {
          return ['#FFBE5A', '#64D7B9'][seriesIndex]
        }
        // color: 'red', // ({ dataIndex }) => ['#FFBE5A', '#64D7B9'][dataIndex],
      }
    }
    this.lineChartExtend = {
      xAxis: {
        show: true,
        axisLabel: {
          interval: 0,
          show: true,
          color: '#6F6F6F'
        },
        axisLine: {
          lineStyle: {
            color: '#D6D6D6'
          },
          show: true
        },
        axisTick: {
          show: false
        }
      },
      series: (data) =>
        data.map((item, i) => ({ ...item, itemStyle: { color: ['#FFBE5A', '#64D7B9', '#5587F0'][i] }}))
    }
    this.lineChartGrid = {
      left: 18,
      top: 16,
      right: 18,
      bottom: 42
    }
    this.lineChartLegend = {
      bottom: 12,
      left: 'center',
      textStyle: {
        color: '#6F6F6F'
      }
    }
    return {
      lineChartFirstHeight: '206px',
      chartData: {
        columns: ['日期', 'UV', 'PV'],
        rows: [
          { 日期: '第一周', UV: 1393, PV: 1093 },
          { 日期: '第二周', UV: 3530, PV: 3230 },
          { 日期: '第三周', UV: 2923, PV: 2623 },
          { 日期: '第四周', UV: 1723, PV: 1423 },
          { 日期: '第五周', UV: 3792, PV: 3492 },
          { 日期: '第六周', UV: 4593, PV: 4293 }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .chart-container {
      width: 100%;
    }
    .container-height {
      height: 206px;
    }
  }
}
</style>
