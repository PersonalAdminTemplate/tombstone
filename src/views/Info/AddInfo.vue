<template>
  <div>
    <a-card :bordered="false" :title="title" class="card">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="头像"
        >
          <div class="clearfix">
            <a-upload
              v-decorator="[
                'headpic',
                {
                  rules: [{ required: true, message: '请上传头像!' }]
                }
              ]"
              listType="picture-card"
              :fileList="fileList"
              :customRequest="customRequest"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 1" class="uploadDiv">
                <a-icon type="plus" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
          </div>
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="姓名"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入姓名!' }]
              }
            ]"
            style="width: 20%"
            placeholder="请输入姓名"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="生日"
        >
          <a-date-picker
            v-decorator="[
              'birthday',
              {
                rules: [{ required: true, message: '请选择生日!' }]
              }
            ]"
            style="width: 30%"
            placeholder="请选择日期"
            :showToday="false"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="祭日"
        >
          <a-date-picker
            v-decorator="[
              'festa',
              {
                rules: [{ required: true, message: '请选择祭日!' }]
              }
            ]"
            style="width: 30%"
            placeholder="请选择日期"
            :showToday="false"
          />
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="地址"
        >
          <a-cascader
            :options="options"
            style="width: 30%"
            placeholder="请选择地址"
            v-decorator="[
              'address',
              {
                rules: [{ required: true, message: '请选择地址!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="生平"
        >
          <a-textarea
            v-decorator="[
              'description',
              {
                rules: [{ required: true, message: '请输入生平介绍!' }]
              }
            ]"
            placeholder="请输入生平介绍"
            :autosize="{ minRows: 4 }"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="照片"
        >
          <div class="clearfix">
            <a-upload
              listType="picture-card"
              :fileList="photosList"
              :customRequest="customRequestPhotos"
              :beforeUpload="beforeUpload"
              :remove="removePhotos"
              @preview="handlePreview"
              @change="handleChangePhotos"
              v-decorator="[
                'photo',
                {
                  rules: [{ required: true, message: '请上传相册!' }]
                }
              ]"
            >
              <div v-if="fileList.length < 30" class="uploadDiv">
                <a-icon type="plus" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="视频"
        >
          <div class="clearfix">
            <a-upload
              :fileList="videoList"
              :customRequest="customRequestVideo"
              :beforeUpload="beforeUploadVideo"
              :remove="removeVideo"
              @change="handleChangeVideo"
              v-decorator="[
                'video',
                {
                  rules: [{ required: true, message: '请上传视频!' }]
                }
              ]"
            >
              <div v-if="videoList.length < 3">
                <a-button> <a-icon type="upload" /> 上传视频 </a-button>
              </div>
            </a-upload>
          </div>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import addressOptions from '@/utils/json'
import API from '@/utils/api'
import OSS from 'ali-oss'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
export default {
  name: 'AddInfo',
  data() {
    return {
      title:
        this.$route.params && this.$route.params.id ? '修改信息' : '新增信息',
      form: this.$form.createForm(this, { name: 'addForm' }),
      info: {},
      options: addressOptions.addressOptions,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      photosList: [],
      videoList: [],
      client: '', // oss图片凭证
      video: '' // oss视频凭证
    }
  },
  beforeCreate() {
    if (this.$route.params && this.$route.params.id) {
      this.$post(API.selectInfo, { id: this.$route.params.id }).then(res => {
        this.info = res
        // 处理省市区数据
        const address = []
        address.push(res.province)
        address.push(res.city)
        address.push(res.district)
        this.fileList.push({
          url: res.headpic,
          uid: '-1',
          status: 'done',
          name: res.headpic
        })
        // 处理照片
        if (res.photos) {
          const photoArray = res.photos.split(',')
          photoArray.forEach((item, index) => {
            this.photosList.push({
              uid: `-(${index} + 1)`,
              url: item,
              name: item,
              status: 'done'
            })
          })
        }
        // 处理视频
        if (res.videos) {
          const videoList = res.videos.split(',')
          videoList.forEach((item, index) => {
            this.videoList.push({
              url: item,
              uid: `-(${index} + 1)`,
              status: 'done',
              name: item
            })
          })
        }
        // 表单置空并赋值
        this.form.resetFields()
        this.form.setFieldsValue({
          name: res.name,
          description: res.description,
          birthday: moment(res.birthday, 'YYYY-MM-DD'),
          festa: moment(res.festa, 'YYYY-MM-DD'),
          address: address,
          headpic: res.headpic,
          photo: res.photos,
          video: res.videos
        })
      })
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    // 头像上传
    async customRequest(data) {
      await this.$post(API.getOSSToken).then(result => {
        const client = new OSS({
          accessKeyId: result.accessKeyId,
          accessKeySecret: result.accessKeySecret,
          stsToken: result.securityToken,
          requestId: result.requestId,
          expiration: result.expiration,
          endpoint: 'oss-cn-beijing.aliyuncs.com',
          bucket: 'mbimage'
        })
        console.log(client)
        client
          .put(
            uuidv1() + data.file.name,
            new Blob([data.file], { type: 'text/plain' })
          )
          .then(res => {
            console.log(res)
            let headPic = {
              uid: res.name,
              name: res.name,
              status: 'done',
              url: res.res.requestUrls[0]
            }
            this.fileList = [headPic]
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    // 照片上传前
    async beforeUpload(file) {
      console.log(file)
      // 统一获取OSS凭证
      await this.$post(API.getOSSToken).then(result => {
        const client = new OSS({
          accessKeyId: result.accessKeyId,
          accessKeySecret: result.accessKeySecret,
          stsToken: result.securityToken,
          requestId: result.requestId,
          expiration: result.expiration,
          endpoint: 'oss-cn-beijing.aliyuncs.com',
          bucket: 'mbimage'
        })
        this.client = client
      })
    },
    // 照片上传
    customRequestPhotos(data) {
      this.client
        .put(
          uuidv1() + data.file.name,
          new Blob([data.file], { type: 'text/plain' })
        )
        .then(res => {
          let headPic = {
            uid: data.file.uid,
            name: res.name,
            status: 'done',
            url: res.res.requestUrls[0]
          }
          this.photosList.push(headPic)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除图片
    removePhotos(data) {
      // 遍历原数组
      this.photosList.forEach((item, index) => {
        if (item.uid === data.uid) {
          this.photosList.splice(index, 1)
        }
      })
    },
    // 照片上传状态改变
    handleChangePhotos() {},
    // 视频上传前
    async beforeUploadVideo(data) {
      console.log(data)
      // 获取上传视频凭证
      await this.$post(API.getOSSToken).then(result => {
        const client = new OSS({
          accessKeyId: result.accessKeyId,
          accessKeySecret: result.accessKeySecret,
          stsToken: result.securityToken,
          requestId: result.requestId,
          expiration: result.expiration,
          endpoint: 'oss-cn-beijing.aliyuncs.com',
          bucket: 'mbvideo'
        })
        this.video = client
      })
    },
    // 自定义上传视频
    customRequestVideo(data) {
      console.log(data)
      this.video
        .put(uuidv1() + data.file.name, data.file)
        .then(res => {
          let headPic = {
            uid: data.file.uid,
            name: res.name,
            status: 'done',
            url: res.res.requestUrls[0]
          }
          this.videoList.push(headPic)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 移除视频
    removeVideo(data) {
      // 遍历原数组
      this.photosList.forEach((item, index) => {
        if (item.uid === data.uid) {
          this.videoList.splice(index, 1)
        }
      })
    },
    // 视频状态修改
    handleChangeVideo() {},
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          // 处理图片数组跟视频数组
          const photoArray = []
          const videoArray = []
          this.photosList.forEach(item => {
            photoArray.push(item.url)
          })
          this.videoList.forEach(item => {
            videoArray.push(item.url)
          })
          const param = {
            name: values.name,
            // birthday:  '',
            birthday: moment(values.birthday).format('YYYY-MM-DD'),
            // festa: '',
            festa: moment(values.festa).format('YYYY-MM-DD'),
            headpic: this.fileList[0].url,
            province: values.address[0],
            city: values.address[1],
            district: values.address[2] || '',
            photos: photoArray.join(','),
            videos: videoArray.join(','),
            description: values.description
          }
          console.log(param)
          // 如果是修改
          if (this.$route.params && this.$route.params.id) {
            param.id = this.$route.params.id
            param.index = this.info.index
            this.$post(API.updateInfo, param).then(res => {
              console.log(res)
              if (!res) {
                this.$message.success('修改成功！')
                this.$router.push('/info/info')
              }
            })
          } else {
            this.$post(API.addInfo, param).then(res => {
              if (!res) {
                this.$message.success('新增成功!')
                this.$router.push('/info/info')
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.uploadDiv {
  margin-top: 20px;
}
</style>
