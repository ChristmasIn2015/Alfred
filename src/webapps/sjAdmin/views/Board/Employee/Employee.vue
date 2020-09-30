<template>
  <div class="over-box">
    <!-- 3 -->
    <div class="box-title">员工列表</div>
    <div class="box-table">
      <!-- 3.1 -->
      <div class="row">
        <div class="column">ID</div>
        <div class="column">
          <input v-model="pageModel.newEmployeeName" placeholder="员工姓名" />
        </div>
        <div class="column">
          <input
            v-model="pageModel.newEmployeePhone"
            placeholder="员工手机号"
          />
        </div>
        <div class="column" style="width: 100%"></div>
        <div class="column">
          <div class="sj-btn blue" @click.stop="pageModel.addMyEmployee">
            添加员工
          </div>
        </div>
      </div>
      <!-- 3.2 -->
      <div
        class="row"
        v-for="(employee, index) in pageModel.employeeList"
        :key="index"
      >
        <div class="column">
          <span>{{ employee.role === 0 ? "店长" : index }}</span>
        </div>
        <div class="column">
          <span>{{ employee.name }}</span>
        </div>
        <div class="column">
          <span>{{ employee.phone }}</span>
        </div>
        <div class="column" style="width: 100%"></div>
        <div class="column">
          <div
            class="sj-btn red"
            @click.stop="pageModel.deleteMyEmployee(employee.employeeId)"
          >
            删除
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "./model/Model.js";
export default {
  data() {
    return {
      pageModel: new Model(),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
