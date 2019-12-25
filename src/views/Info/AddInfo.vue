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
        <!-- 上传图片辅助组件 -->
        <div class="clearfix">
          <a-upload
            v-show="false"
            class="img-uploader"
            listType="picture-card"
            :fileList="photosList"
            :customRequest="customRequestPhotosDesc"
            :beforeUpload="beforeUpload"
          >
          </a-upload>
        </div>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="隐藏简介"
        >
          <a-switch
            v-decorator="['isDescHide', { valuePropName: 'checked' }]"
          />
        </a-form-item>
        <!-- 上传图片组件over -->
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="生平"
        >
          <div class="edit_container">
            <quill-editor
              class="ql-editor"
              v-model="description"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            >
            </quill-editor>
          </div>
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="隐藏图片视频"
        >
          <a-switch
            v-decorator="['isMediaHide', { valuePropName: 'checked' }]"
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
        <!-- 相册对应描述 -->
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          v-for="k in photosList.length"
          :key="k"
          :label="`照片描述${k}`"
        >
          <a-input
            v-decorator="[`names[${k}]`]"
            placeholder="请输入描述"
            style="width: 80%; margin-right: 8px"
          />
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
              v-decorator="['video']"
            >
              <div v-if="videoList.length < 3">
                <a-button> <a-icon type="upload" /> 上传视频 </a-button>
              </div>
            </a-upload>
          </div>
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="音频"
        >
          <div class="clearfix">
            <a-upload
              :fileList="audioList"
              :customRequest="customRequestAudio"
              :beforeUpload="beforeUploadAudio"
              :remove="removeAudio"
              @change="handleChangeAudio"
              v-decorator="['Audio']"
            >
              <div v-if="audioList.length < 3">
                <a-button> <a-icon type="upload" /> 上传音频 </a-button>
              </div>
            </a-upload>
          </div>
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="墓地"
        >
          <a-input-search
            style="width: 100%"
            placeholder="请输入地名"
            @search="onSearch"
          />
          <baidu-map
            class="bm-view"
            :center="center"
            :zoom="zoom"
            @ready="mapReady"
            :scroll-wheel-zoom="true"
            @click="getClickInfo"
            @moving="syncCenterAndZoom"
            @moveend="syncCenterAndZoom"
            @zoomend="syncCenterAndZoom"
          >
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-marker
              :position="center"
              :dragging="true"
              @click="infoWindowOpen"
              animation="BMAP_ANIMATION_BOUNCE"
            >
              <bm-info-window
                :show="show"
                @close="infoWindowClose"
                @open="infoWindowOpen"
                >{{ mapInfo }}</bm-info-window
              >
            </bm-marker>
          </baidu-map>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          {{ mapInfo }}
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import * as Quill from 'quill'
import addressOptions from '@/utils/json'
import API from '@/utils/api'
import OSS from 'ali-oss'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
export default {
  name: 'AddInfo',
  data() {
    let fontSizeStyle = Quill.import('attributors/style/size')
    fontSizeStyle.whitelist = ['12px', '14px', '16px', '20px', '24px', '36px']
    Quill.register(fontSizeStyle, true)

    //quill编辑器的字体
    var fonts = [
      'SimSun',
      'SimHei',
      'Microsoft-YaHei',
      'KaiTi',
      'FangSong',
      'Arial',
      'Times-New-Roman',
      'sans-serif'
    ]
    var Font = Quill.import('formats/font')
    Font.whitelist = fonts
    //将字体加入到白名单
    Quill.register(Font, true)
    return {
      // 地图相关
      addressKey: '',
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 13,
      myGeo: '',
      mapInfo: '',
      show: false,
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
      audioList: [],
      client: '', // oss图片凭证
      video: '', // oss视频凭证
      audio: '',
      // 富文本相关
      description: ``,
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
              [{ script: 'sub' }, { script: 'super' }], // 上标/下标
              [
                {
                  color: [
                    '#ffffff',
                    '#ffd7d5',
                    '#ffdaa9',
                    '#fffed5',
                    '#d4fa00',
                    '#73fcd6',
                    '#a5c8ff',
                    '#ffacd5',
                    '#ff7faa',
                    '#d6d6d6',
                    '#ffacaa',
                    '#ffb995',
                    '#fffb00',
                    '#73fa79',
                    '#00fcff',
                    '#78acfe',
                    '#d84fa9',
                    '#ff4f79',
                    '#b2b2b2',
                    '#d7aba9',
                    '#ff6827',
                    '#ffda51',
                    '#00d100',
                    '#00d5ff',
                    '#0080ff',
                    '#ac39ff',
                    '#ff2941',
                    '#888888',
                    '#7a4442',
                    '#ff4c00',
                    '#ffa900',
                    '#3da742',
                    '#3daad6',
                    '#0052ff',
                    '#7a4fd6',
                    '#d92142',
                    '#000000',
                    '#7b0c00',
                    '#ff0000',
                    '#d6a841',
                    '#407600',
                    '#007aaa',
                    '#021eaa',
                    '#797baa',
                    '#ab1942'
                  ]
                },
                {
                  background: [
                    '#ffffff',
                    '#ffd7d5',
                    '#ffdaa9',
                    '#fffed5',
                    '#d4fa00',
                    '#73fcd6',
                    '#a5c8ff',
                    '#ffacd5',
                    '#ff7faa',
                    '#d6d6d6',
                    '#ffacaa',
                    '#ffb995',
                    '#fffb00',
                    '#73fa79',
                    '#00fcff',
                    '#78acfe',
                    '#d84fa9',
                    '#ff4f79',
                    '#b2b2b2',
                    '#d7aba9',
                    '#ff6827',
                    '#ffda51',
                    '#00d100',
                    '#00d5ff',
                    '#0080ff',
                    '#ac39ff',
                    '#ff2941',
                    '#888888',
                    '#7a4442',
                    '#ff4c00',
                    '#ffa900',
                    '#3da742',
                    '#3daad6',
                    '#0052ff',
                    '#7a4fd6',
                    '#d92142',
                    '#000000',
                    '#7b0c00',
                    '#ff0000',
                    '#d6a841',
                    '#407600',
                    '#007aaa',
                    '#021eaa',
                    '#797baa',
                    '#ab1942'
                  ]
                }
              ], // 字体颜色、字体背景颜色
              [{ font: fonts }],
              [{ size: fontSizeStyle.whitelist }],
              [{ header: 1 }, { header: 2 }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ align: [] }],
              ['image'],
              ['clean']
            ],
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector('.img-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        },
        placeholder: '请输入...'
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  beforeCreate() {
    if (this.$route.params && this.$route.params.id) {
      this.$post(API.selectInfo, { id: this.$route.params.id, isEdit: 1 }).then(
        res => {
          this.center.lat = res.latitude
          this.center.lng = res.longitude
          this.mapInfo = res.cemetery
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
          // 处理音频
          if (res.bgMusic) {
            const audioList = res.bgMusic.split(',')
            audioList.forEach((item, index) => {
              this.audioList.push({
                url: item,
                uid: `-(${index} + 1)`,
                status: 'done',
                name: item
              })
            })
          }
          // 表单置空并赋值
          this.description = res.description
          this.form.resetFields()
          this.form.setFieldsValue({
            name: res.name,
            birthday: moment(res.birthday, 'YYYY-MM-DD'),
            festa: moment(res.festa, 'YYYY-MM-DD'),
            address: address,
            headpic: res.headpic,
            photo: res.photos,
            video: res.videos,
            isMediaHide: res.isMediaHide === 1 ? true : false,
            isDescHide: res.isDescHide === 1 ? true : false
          })
        }
      )
    }
  },
  methods: {
    mapReady({ BMap }) {
      const _this = this
      // 获取自动定位方法
      const geolocation = new BMap.Geolocation()
      // 获取逆解析实例
      this.myGeo = new BMap.Geocoder()
      // 获取自动定位获取的坐标信息
      geolocation.getCurrentPosition(
        function(r) {
          if (_this.center.lng === 0) {
            _this.center.lng = r.point.lng
            _this.center.lat = r.point.lat
            _this.mapInfo = r.address.province + r.address.city
          }
        },
        { enableHighAccuracy: true }
      )
    },
    // 搜索框搜索
    onSearch(value) {
      const _this = this
      _this.myGeo.getPoint(value, function(r) {
        _this.center.lng = r.lng
        _this.center.lat = r.lat
        _this.mapInfo = value
      })
    },
    /***
     * 地图点击事件。
     */
    getClickInfo(e) {
      const _this = this
      _this.center.lng = e.point.lng
      _this.center.lat = e.point.lat
      this.myGeo.getLocation(e.point, result => {
        _this.mapInfo = result.address + result.business
      })
    },
    syncCenterAndZoom(e) {
      const _this = this
      const { lng, lat } = e.target.getCenter()
      _this.center.lng = lng
      _this.center.lat = lat
      _this.zoom = e.target.getZoom()
    },
    infoWindowClose() {
      this.show = false
    },
    infoWindowOpen() {
      this.show = true
    },
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
        client
          .put(
            uuidv1() + data.file.name,
            new Blob([data.file], { type: 'text/plain' })
          )
          .then(res => {
            let headPic = {
              uid: res.name,
              name: res.name,
              status: 'done',
              url: res.res.requestUrls[0]
            }
            this.fileList = [headPic]
          })
      })
    },
    // 照片上传前
    async beforeUpload() {
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
    },
    // 编辑框插入图片
    customRequestPhotosDesc(data) {
      this.client
        .put(
          uuidv1() + data.file.name,
          new Blob([data.file], { type: 'text/plain' })
        )
        .then(res => {
          console.log(res)
          let quill = this.$refs.myQuillEditor.quill
          // 获取光标所在位置
          let length = quill.getSelection().index
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.url)
          // 调整光标到最后
          quill.setSelection(length + 1)
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
    async beforeUploadVideo() {
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
      this.video.put(uuidv1() + data.file.name, data.file).then(res => {
        let headPic = {
          uid: data.file.uid,
          name: res.name,
          status: 'done',
          url: res.res.requestUrls[0]
        }
        this.videoList.push(headPic)
      })
    },
    // 移除视频
    removeVideo(data) {
      // 遍历原数组
      this.videoList.forEach((item, index) => {
        if (item.uid === data.uid) {
          this.videoList.splice(index, 1)
        }
      })
    },
    // 视频状态修改
    handleChangeVideo() {},
    // 音频上传前
    async beforeUploadAudio() {
      // 获取上传音频凭证
      await this.$post(API.getOSSToken).then(result => {
        const client = new OSS({
          accessKeyId: result.accessKeyId,
          accessKeySecret: result.accessKeySecret,
          stsToken: result.securityToken,
          requestId: result.requestId,
          expiration: result.expiration,
          endpoint: 'oss-cn-shenzhen.aliyuncs.com',
          bucket: 'mbaudio'
        })
        this.audio = client
      })
    },
    // 自定义上传音频
    customRequestAudio(data) {
      this.audio.put(uuidv1() + data.file.name, data.file).then(res => {
        let headPic = {
          uid: data.file.uid,
          name: res.name,
          status: 'done',
          url: res.res.requestUrls[0]
        }
        this.audioList.push(headPic)
      })
    },
    // 移除视频
    removeAudio(data) {
      // 遍历原数组
      this.audioList.forEach((item, index) => {
        if (item.uid === data.uid) {
          this.audioList.splice(index, 1)
        }
      })
    },
    // 视频状态修改
    handleChangeAudio() {},
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          // 处理图片数组跟视频数组
          const photoArray = []
          const videoArray = []
          const audioArray = []
          this.photosList.forEach(item => {
            photoArray.push(item.url)
          })
          this.videoList.forEach(item => {
            videoArray.push(item.url)
          })
          this.audioList.forEach(item => {
            audioArray.push(item.url)
          })
          const param = {
            name: values.name,
            birthday: moment(values.birthday).format('YYYY-MM-DD'),
            festa: moment(values.festa).format('YYYY-MM-DD'),
            headpic: this.fileList[0].url,
            province: values.address[0],
            city: values.address[1],
            district: values.address[2] || '',
            photos: photoArray.join(','),
            videos: videoArray.join(','),
            bgMusic: audioArray.join(','),
            longitude: this.center.lng,
            latitude: this.center.lat,
            description: this.description,
            cemetery: this.mapInfo,
            isDescHide: values.isDescHide ? 1 : 0,
            isMediaHide: values.isMediaHide ? 1 : 0,
            photosDesc: JSON.stringify(values.names),
            viewCount: this.info.viewCount
          }
          console.log(param)
          // 如果是修改
          if (this.$route.params && this.$route.params.id) {
            param.id = this.$route.params.id
            param.index = this.info.index
            this.$post(API.updateInfo, param).then(res => {
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
    },
    onEditorReady(editor) {
      // 准备编辑器
      console.log(editor)
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange(event) {
      console.log(event.html)
      this.description = event.html
    } // 内容改变事件
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

/deep/ .ql-editor {
  min-height: 100px !important;
}
.bm-view {
  width: 100%;
  height: 300px;
}
.quill_box {
  .ql-toolbar.ql-snow {
    border-color: #dcdfe6;
  }
  .ql-container {
    height: 200px !important;
    border-color: #dcdfe6;
  }
  .ql-snow .ql-picker-label::before {
    position: relative;
    top: -10px;
  }
  .ql-snow .ql-color-picker .ql-picker-label svg,
  .ql-snow .ql-icon-picker .ql-picker-label svg {
    position: relative;
    top: -6px;
  }
}
</style>
