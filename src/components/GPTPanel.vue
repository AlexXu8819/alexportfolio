<template>
    <div class="main-content">
        <div class="head-container">
            <div class="change-mode-btn" style="
                    display: flex; 
                    flex-direction: row; 
                    padding: 15px 10px;
                    margin-left: 15px;
                    align-items: center;    
                ">
                <div style="
                        color:#949494; 
                        font-size: 1.25em;
                        font-weight: 800;
                    ">llama-GPT</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M5.293 9.293a1 1 0 0 1 1.414 0L12 14.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414"
                        clip-rule="evenodd">
                    </path>
                </svg>
            </div>
            <div class="user-icon"></div>
        </div>
        <div class="body-container">
            <div class="chat-messages">
                <div 
                    :class="['chat-message', { 'is-user': msg.isUser }]" 
                    v-for="(msg, index) in messages" 
                    :key="index"
                >
                <p>{{ msg.text }}</p>
            </div>
            </div>
        </div>
        <div class="bottom-container">
            <div class="input-container">
                <input class="fixed-input" 
                    style="
                        height: 100%;
                        width: 80%;
                        background-color: #dadada;
                        border:none;
                    " type="text" 
                    placeholder="请向llama-GPT提出问题..." 
                    @input="checkMessage" 
                    v-model="message"
                    @keydown.enter="sendMessage">
                <button 
                    style="background-color: #000;
                        color:#fff; 
                        height: 40px; 
                        width: 40px; 
                        border-radius: 50%;
                    "
                    :disabled="isButtonDisabled" @click="sendMessage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32"
                        class="icon-2xl">
                        <path fill="currentColor" fill-rule="evenodd"
                            d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="friendly-notice">
                GPT也可能会犯错，请核查重要信息
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([]);
const message = ref('')
const isButtonDisabled = ref(true)

const sendMessage = async () => {
    if (message.value.trim() !== '') {
        messages.value.push({ text: message.value, isUser: true });
        const userMessage = message.value;
        message.value = '';
        checkMessage();

        try {
            // 从 API 获取响应
            const response = await fetch('http://localhost:5000/llamagpt/respond',{
                method: 'POST', // 使用 POST 方法
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await response.json();
            const reply = data.response; // 假设响应数据中的 `body` 字段是我们想要的回复

            // 添加获取的响应到消息列表
            messages.value.push({ text: reply, isUser: false });
        } catch (error) {
            // 处理错误情况
            console.error('Error fetching response:', error);
            messages.value.push({ text: 'Error fetching response', isUser: false });
        }
    }
};


const checkMessage = () => {
    isButtonDisabled.value = message.value.trim() === '';
}

checkMessage();
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 95%;
  overflow: hidden;
}

.main-content::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}

.main-content {
    display: flex;
    flex-direction: column;
    height: 95vh;
    width:80%;
    overflow:hidden;
}

.head-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
}

.change-mode-btn {
    display: flex;
    align-items: center;
}

.change-mode-btn .title {
    color: #949494;
    font-size: 1.25em;
    font-weight: 800;
    margin-right: 8px;
}

.body-container {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    width:100%;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  /* position: fixed; */
}

.chat-message {
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  word-wrap: break-word;
}

.chat-message.is-user {
  align-self: flex-end;
  background-color: #c8e6c9;
}

.chat-message:not(.is-user) {
  align-self: flex-start;
  background-color: #e0e0e0;
}
.bottom-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: calc(100% - 250px);
    padding-bottom: 10px;
}

.input-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 80%;
    padding: 10px 8px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    background: #dadada;
}

.fixed-input {
    height: 100%;
    width: 80%;
    background-color: #dadada;
    border: none;
}

button {
    background-color: #000;
    color: #fff;
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.friendly-notice {
    font-size: 0.625em;
}
</style>