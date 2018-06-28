<template>
  <!-- 接口详情 -->
  <div class="content-all">
    <el-button type="primary" size="small" class="btn" v-if="!edit" @click="editEvent">实体编辑</el-button>
    <el-button type="success" size="small" class="btn" v-if="edit" @click="saveEvent">实体保存</el-button>
    <div class="content-box" v-if="objectData">
    <!-- 接口头部信息展示 -->
      <el-form label-width="90px" size="mini" style="margin-right: 20px">
        <el-form-item label="实体名称">
          <el-input v-model="objectData.name" :disabled="!edit"></el-input>
        </el-form-item>
        <el-form-item label="所属集群" v-if="clusterList" prop="clusterId">
          <el-select  v-model="objectData.clusterId" placeholder="实体所属集群" filterable size="mini" style="width: 100%" :disabled="!edit">
            <el-option
              :key="item.id"
              :label="item.name"
              :value="item.id"
              v-for="item in clusterList">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实体说明">
          <el-input v-model="objectData.remark" type="textarea" :rows="2" :disabled="!edit"></el-input>
        </el-form-item>
      </el-form>
      <div class="table-box">
        <p>参数编辑</p>
        <arguments
          :edit="edit"
          :entity="true"
          :list="objectData.propertyList"
          v-if="objectData.propertyList"
          v-model="objectData.propertyList"
        ></arguments>
        <p style="color: red" class="tip">注意：实体关联时，自身参数不能关联自身; 多个实体，不能形成闭环关联，如A中参数关联B，B中参数又关联A</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../../utils/storage'
import Arguments from '../paramter/arguments'
import ArrChange from '../../utils/arrayChange'
export default {
  props: {
    // objectData: {
    //   type: Object
    // }
  },
  data () {
    return {
      edit: false,
      clusterList: null,
      propertyList: null
    }
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
  },
  computed: {
    ...mapState('detail', [
      'objectData'
    ])
  },
  methods: {
    ...mapActions('detail', [
      'editObjectDetail'
    ]),
    editObjectAjax () {
      let parame = this.objectData
      parame.propertyList = ArrChange.arrayRefEntityToNumber(this.objectData.propertyList)
      let callback = (data) => {
        if (data.code === 0) {
          this.edit = !this.edit
          // success
          Message.success('保存成功')
          // 跳列表页
          // this.$router.push({name: 'object'})
        } else {
          Message.error(data.message)
        }
      }
      this.editObjectDetail({parame, callback})
    },
    editEvent () {
      this.edit = !this.edit
    },
    saveEvent () {
      this.editObjectAjax()
    }
  },
  components: {
    Arguments
  },
  watch: {
    objectData: {
      handler: function (newVal, oldVal) {
        this.objectData.propertyList = ArrChange.arrayRefEntityToStr(this.objectData.propertyList)
      },
      deep: true
    }
  }
}
</script>
<style lang='scss' scoped>
  .content-all{
    position: relative;
    padding-top: 50px;
  }
  .content-box{
    min-height: 600px;
    font-size: 13px;
    color: #525a66;
    // margin-top: 50px
  }
  .table-box{
    padding-top: 30px;
    p{
      font-size: 16px;
      line-height: 40px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .tip {
      color: red;
      font-size: 12px;
      font-weight: 100;
      margin-left: 20px;
    }
  }
  .btn{
    // float: right;
    margin-right: 18px;
    position: absolute;
    top: 0;
    right: 0;
  }
</style>

