<template>
  <div class="main">
    <div style="width: 100%;height: 130px;">
      <h1 style="float: left;">博航学社{{ $route.params.id }}</h1>
      <div class="info">
        <p>职务：</p>
        <p>权限：</p>
      </div>
    </div>
    <div class="box">
      <h2>社团简介</h2>
      <p>默认文本</p>
      <h2>成立时间</h2>
      <p>2023.9.28</p>
      <h2>社团负责人</h2>
      <table>
        <tr>
          <th>职务</th>
          <th>姓名</th>
        </tr>
        <tr>
          <td>社长</td>
          <td></td>
        </tr>
        <tr>
          <td>副社长</td>
          <td></td>
        </tr>
        <tr>
          <td>副社长</td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="box" style="text-align: center">
      <push></push>
    </div>
  </div>
</template>
<script>
import Push from './Push.vue';
export default {
  components: { Push },};
</script>

<style>
.main {
  margin: 15px;
  padding: 20px;
  border-radius: 25px;
  background-color: rgb(241, 241, 241);
  width: auto;
  height: 670px;
}
h1 {
  font-size: 50px;
  font-family: NSimSun;
}
.info{
    float: right;
    margin-right: 30px;
    width: 200px;
    height: 130px;
    border: 1px solid black;
    border-radius: 15px;
}
.box {
  float: left;
  margin: 2%;
  padding: 2%;
  border-radius: 25px;
  width: 46%;
  height: 470px;
  background-color: rgb(230, 230, 230);
}
table {
  width: 100%;
  text-align: center;
  border: 1px;
}
th,
td {
  width: 50%;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  height: 20px;
}
p {
  text-indent: 2ch;
}
</style>