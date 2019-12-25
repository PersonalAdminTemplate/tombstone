<template>
  <div>
    <a-card :bordered="false" class="card">
      <!-- search -->
      <a-row class="searchForm">
        <a-col :span="1" class="label">姓名:</a-col>
        <a-col :span="3"><a-input v-model="searchValue"></a-input></a-col>
        <a-col :span="1" style="margin: 0 10px">
          <a-button type="primary" @click="queryInfo">查询</a-button></a-col
        >
        <a-col :span="1"
          ><a-button type="primary" @click="add">新增</a-button></a-col
        >
      </a-row>

      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :rowKey="(data, index) => index"
        :pagination="{ total: total }"
        @change="tableChange"
      >
        <template slot="headpic" slot-scope="text, record">
          <img :src="record.headpic" alt="" style="width: 50px;heigth:50px" />
        </template>
        <template slot="qrcode" slot-scope="text, record">
          <img
            :src="record.qrcode"
            alt="二维码"
            class="qrcode"
            @click="showImg(record.qrcode)"
            style="width: 50px;heigth:50px"
          />
        </template>
        <template slot="isMediaHide" slot-scope="text, record">
          <a-switch
            :checked="record.isMediaHide === 1 ? true : false"
            @change="checked => mediaChange(checked, record)"
          ></a-switch>
        </template>
        <template slot="isDescHide" slot-scope="text, record">
          <a-switch
            :checked="record.isDescHide === 1 ? true : false"
            @change="checked => descChange(checked, record)"
          ></a-switch>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-button
            type="dashed"
            @click="edit(text, record)"
            style="margin-right: 5px;"
            >修改</a-button
          >

          <a-button type="danger" @click="del(text, record)">删除</a-button>
        </template>
      </a-table>

      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-card>
  </div>
</template>

<script>
// import moment from 'moment'
import API from '@/utils/api'
export default {
  name: 'Info',
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      param: {
        pageSize: 10,
        pageIndex: 1
      },
      total: 1,
      searchValue: '',
      // 表格
      columns: [
        {
          title: '头像',
          dataIndex: 'headpic',
          align: 'center',
          scopedSlots: { customRender: 'headpic' }
        },
        {
          title: '姓名',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '生日',
          dataIndex: 'birthday',
          align: 'center',
          customRender: value => {
            return {
              children: value.substring(0, 10)
            }
          }
        },
        {
          title: '祭日',
          dataIndex: 'festa',
          align: 'center',
          customRender: value => {
            return {
              children: value.substring(0, 10)
              // children: value
            }
          }
        },
        {
          title: '省',
          dataIndex: 'province',
          align: 'center'
        },
        {
          title: '市',
          dataIndex: 'city',
          align: 'center'
        },
        {
          title: '区',
          dataIndex: 'district',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'createtime',
          align: 'center'
        },
        {
          title: '修改时间',
          dataIndex: 'updatetime',
          align: 'center'
        },
        {
          title: '浏览量',
          dataIndex: 'viewCount',
          align: 'center'
        },
        {
          title: '二维码',
          dataIndex: 'qrcode',
          align: 'center',
          scopedSlots: { customRender: 'qrcode' }
        },
        {
          title: '媒体隐藏',
          dataIndex: 'isMediaHide',
          align: 'center',
          scopedSlots: { customRender: 'isMediaHide' }
        },
        {
          title: '简介隐藏',
          dataIndex: 'isDescHide',
          align: 'center',
          scopedSlots: { customRender: 'isDescHide' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: []
    }
  },
  beforeCreate() {},
  created() {
    this.queryInfo()
  },
  mounted() {},
  methods: {
    queryInfo() {
      const param = this.param
      param.name = this.searchValue
      this.$post(API.queryInfo, this.param).then(res => {
        console.log(res)
        this.dataSource = res.list
        this.total = res.total
      })
    },
    tableChange(pagination) {
      console.log(pagination)
      this.param.pageIndex = pagination.current
      this.queryInfo()
    },
    showImg(url) {
      this.previewImage = url
      this.previewVisible = true
    },
    handleCancel() {
      this.previewVisible = false
    },
    add() {
      this.$router.push('/info/addInfo')
    },
    // 媒体隐藏
    mediaChange(checked, record) {
      console.log(checked, record)
      this.$post(API.updateInfo, {
        id: record.id,
        isMediaHide: checked ? 1 : 0,
        isDescHide: record.isDescHide,
        viewCount: record.viewCount
      }).then(() => {
        this.queryInfo()
      })
    },
    // 生平隐藏
    descChange(checked, record) {
      this.$post(API.updateInfo, {
        id: record.id,
        isMediaHide: record.isMediaHide,
        isDescHide: checked ? 1 : 0,
        viewCount: record.viewCount
      }).then(() => {
        this.queryInfo()
      })
    },
    // 修改
    edit(text, record) {
      console.log(text, record)
      this.$router.push({
        name: 'AddInfo',
        params: { id: record.id }
      })
    },
    // 删除
    del(text, record) {
      console.log(text, record)
      this.$post(API.delInfo, { id: record.id, index: record.index }).then(
        res => {
          console.log(res)
          this.$message.success('删除成功！')
          this.queryInfo()
        }
      )
    }
  }
}
</script>

<style scoped>
.searchForm {
  margin-bottom: 16px;
}
.label {
  line-height: 32px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  vertical-align: top;
}
.qrcode:hover {
  cursor: pointer;
}
</style>
