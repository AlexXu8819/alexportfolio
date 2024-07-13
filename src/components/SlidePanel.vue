<!-- src/components/Sidebar.vue -->
<template>
    <div class="sidebar">
        <!-- 侧边栏内容 -->
        <p style="font-weight: bold;">Alex's Portfolio</p>
        <div class="btns-list">
            <ul>
                <li><button :class="getButtonClass('/')" @click="navigateTo('/')">主界面</button></li>
                <li><button :class="getButtonClass('/sceneclassify')" @click="navigateTo('/sceneclassify')">图片分类</button></li>
                <li><button :class="getButtonClass('/gpt')" @click="navigateTo('/gpt')">llama-GPT</button></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const navigateTo = (path) => {
    if (route.path !== path) {
    router.push(path);
  }
};

const getButtonClass = (path) => {
  return ['li-btn', route.path === path ? 'active' : ''];
};
</script>

<style scoped>
.sidebar {
    width: 250px;
    background-color: #ededed;
    /* color: white; */
    height: 95vh;
    /* 高度设置为视窗高度 */
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}


ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0px 0;
  color:#333;
  height: 40px;
}

button.li-btn{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    background-color: #ededed;
    border-style: hidden;
    transition: background-color 0.1s ease, color 0.1s ease;
}

button.li-btn.active {
  background-color: #dadada;
  color: #000;
}

button.li-btn:hover{
    background-color: #dadada;
}
</style>