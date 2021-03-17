<template>
  <div id="caseD">
    <el-container style="margin-top: -50px; width: 100%">
      <el-header height="100px">
        <div style="margin-top: 30px">
          <table>
            <tr>
              <th>案件名称：</th>
              <th>{{ resCaseData.caseName }}</th>
              <th style="padding-left: 20px">案件编号：</th>
              <th>{{ resCaseData.caseNum }}</th>
            </tr>
          </table>

          <div class="elB">
            <el-button type="primary" plain @click="addCaseDialogVisible = true"
              >案件登记
            </el-button>
            <el-button type="success" plain>案件查询</el-button>
          </div>
          <!-- 下面是添加案件注册对话框 -->
          <el-dialog
            title="案件登记"
            :visible.sync="addCaseDialogVisible"
            width="50%"
            @close="resetDiaoLogCase()"
          >
            <el-form :model="diaCaseForm" label-width="100px" ref="diaCaseForm">
              <el-form-item label="案件名称:">
                <el-input v-model="diaCaseForm.diaCaseName"></el-input>
              </el-form-item>
              <el-form-item label="案件来源:">
                <el-select
                  v-model="diaCaseForm.diaCaseRes"
                  placeholder="请选择案件来源"
                  style="float: left"
                >
                  <el-option label="公安机关" value="公安机关"></el-option>
                  <el-option
                    label="市场监督管理部门"
                    value="市场监督管理部门"
                  ></el-option>
                  <el-option label="法院判决" value="法院判决"></el-option>
                  <el-option label="检察机关" value="检察机关"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发案时间:">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="diaCaseForm.diaCaseDate"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    style="width: 200px; float: left"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="发案地点:">
                <el-input v-model="diaCaseForm.diaLocationC"></el-input>
              </el-form-item>
              <el-form-item label="涉案金额:">
                <el-input
                  v-model="diaCaseForm.diaMoneyCount"
                  style="width: 200px; float: left"
                ></el-input>
                <span style="float: left; margin-left: 10px">万元</span>
              </el-form-item>
              <el-form-item label="涉案人数">
                <el-input
                  style="float: left; width: 100px"
                  v-model="diaCaseForm.diaPersonCount"
                ></el-input>
                <span style="float: left; margin-left: 10px">人</span>
              </el-form-item>
              <el-form-item label="案情简介">
                <el-input
                  type="textarea"
                  v-model="diaCaseForm.diaCaseInfo"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="resetDiaoLogCase()">重 置</el-button>
              <el-button type="primary" @click="addCase()">提 交</el-button>
            </span>
          </el-dialog>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <router-link to="/register">
            <el-button
              type="primary"
              plain
              icon="el-icon-menu"
              style="font-size: 20px"
              >案情
            </el-button>
          </router-link>
          <router-link to="/person">
            <el-button
              type="primary"
              plain
              icon="el-icon-menu"
              style="font-size: 20px"
              >嫌疑人
            </el-button>
          </router-link>
          <router-link to="/test">
            <el-button
              type="primary"
              plain
              icon="el-icon-menu"
              style="font-size: 20px"
              >测试
            </el-button>
          </router-link>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { request } from "@/network/request";

export default {
  name: "Case",
  data() {
    return {
      addCaseDialogVisible: false, //控制对话框显示
      diaCaseForm: {
        diaCaseName: "",
        diaCaseRes: "",
        diaCaseDate: "",
        diaLocationC: "",
        diaMoneyCount: "",
        diaPersonCount: "",
        diaCaseInfo: ""
      },
      resCaseData: { caseNum: "", caseName: "" }
    };
  },
  methods: {
    addCase() {
      this.addCaseDialogVisible = false;
      request({
        method: "post",
        url: "caseRg.do",
        data: {
          CASE_NAME: this.diaCaseForm.diaCaseName,
          CASE_SOURCE: this.diaCaseForm.diaCaseRes,
          TIME_OF_CASE: this.diaCaseForm.diaCaseDate,
          LOCATION_OF_CASE: this.diaCaseForm.diaLocationC,
          AMOUNT_INVOLVED: this.diaCaseForm.diaMoneyCount,
          NUMBER_OF_OFFENDERS: this.diaCaseForm.diaPersonCount,
          BRIEF_INTRODUCTION: this.diaCaseForm.diaCaseInfo
        }
      })
        .then(response => {
          if (response.status === 201) {
            alert("案件注册成功！");
            this.resCaseData.caseName = response.data.caseName;
            this.resCaseData.caseNum = response.data.caseNum;
          }
          console.log("response", response);
          return response;
        })
        .catch(error => {
          if (error) {
            alert("案件注册失败！");
          }
          console.log("error", error);
          return error;
        });
      this.resetDiaoLogCase();
    },
    resetDiaoLogCase() {
      this.diaCaseForm.diaCaseName = "";
      this.diaCaseForm.diaCaseRes = "";
      this.diaCaseForm.diaCaseInfo = "";
      this.diaCaseForm.diaPersonCount = "";
      this.diaCaseForm.diaLocationC = "";
      this.diaCaseForm.diaMoneyCount = "";
      this.diaCaseForm.diaCaseDate = "";
    }
  }
};
</script>
<style>
.elB {
  margin-top: -30px;
  float: right;
}

.el-header {
  background-color: #5184cd;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 1000px;
}
</style>
