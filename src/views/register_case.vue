<template>
  <div class="register">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="案件名称:">
        <el-input v-model="form.caseName"></el-input>
      </el-form-item>
      <el-form-item label="案件来源:">
        <el-select
          v-model="form.caseRes"
          placeholder="请选择案件来源"
          style="float: left"
        >
          <el-option label="公安机关" value="gongan"></el-option>
          <el-option
            label="市场监督管理部门"
            value="shichangjiandu"
          ></el-option>
          <el-option label="法院判决" value="fayuan"></el-option>
          <el-option label="检察机关" value="jianchajiguan"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发案时间:">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.caseDate"
            style="width: 200px;float: left"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="发案地点:">
        <el-input v-model="form.locationC"></el-input>
      </el-form-item>
      <el-form-item label="涉案金额:">
        <el-input
          v-model="form.moneyCount"
          style="width: 200px;float:left;"
        ></el-input
        ><span style="float: left;margin-left: 10px">万元</span>
      </el-form-item>
      <el-form-item label="涉案人数">
        <el-input
          style="float: left;width: 100px"
          v-model="form.personCount"
        ></el-input
        ><span style="float: left;margin-left: 10px">人</span>
      </el-form-item>
      <el-form-item label="案情简介">
        <el-input type="textarea" v-model="form.caseInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "RegisterCase",
  data() {
    return {
      form: {
        caseName: "",
        caseRes: "",
        caseDate: "",
        locationC: "",
        moneyCount: "",
        personCount: "",
        caseInfo: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
