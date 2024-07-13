<template>
    <div class="background">
        <div class="title-container" style="padding: 10px;">
            <div class="logo-title">
                <div class="logo">
                    <img src="@/assets/image-gallery.png" alt="" style="height:50px ;">
                </div>
                <div class="title" style="font-weight: bold; color: #fff;">SceneClassify</div>
            </div>
        </div>
        <div class="main-panel">
            <div class="main-title">Let Me Tell What is Your Pic</div>
            <el-upload 
                action="http://localhost:5000/classify/classify-the-pics" 
                list-type="picture-card" 
                :auto-upload="false"
                :on-success="handleSuccess"
                ref="uploadRef"
            >
                <!-- <el-icon>
                    <Plus />
                </el-icon> -->

                <el-button slot="trigger" type="primary">选择图片</el-button>

                <template #file="{ file }">
                    <div>
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="图片无法查看" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <el-icon><zoom-in /></el-icon>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                <el-icon>
                                    <Download />
                                </el-icon>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </div>
                </template>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-upload>
            <el-button 
                class="btn" 
                type="success" 
                @click="confirmUpload"
            >Predict Now!</el-button>
            <div class="bullshit-prewords">According my Prediction, your picture is:</div>
            <div class="predict_result">{{ predict_result }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import axios from 'axios';

const dialogImageUrl = ref('')
const predict_result = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const uploadRef = ref(null)

const confirmUpload = ()=>{
      if (uploadRef.value) {
        uploadRef.value.submit();
      }
}

const handleRemove = (file) => {
  console.log(file)
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleDownload = (file) => {
    console.log(file)
}

const handleSuccess = (response, file, fileList) => {

    console.log('Upload response:', response); // Log the response
    if (response && response.result) {
    predict_result.value = response.result;
    console.log('Prediction Result:', predict_result.value); // Log the prediction result
  } else {
    console.error('Unexpected response structure:', response);
  }
  // 上传成功后清空文件列表
  console.log('Upload response:', response)
//   predict_result.value = response.data.result
  uploadRef.value.clearFiles();
}

</script>

<style lang="css" scoped>
.background{
    background-color: #fff;
    .main-panel{
        /* background:url("@/assets/background.jpg");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat; */
        padding: 20px 10px;
        height: 600px;

        .main-title{
            font-size: 2em;
            color: #fff;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .btn{
            margin-top: 10px;
            margin-bottom: 20px;
        }

        .bullshit-prewords{

            font-size: 1.2em;
            font-weight: bold;
            color: #fff;
        }

        .predict_result{
            font-size: 1.5em;
            font-weight: bold;
            color: crimson;
        }
    }
}
</style>