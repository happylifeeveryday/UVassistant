<!-- <template>
  <h1>Access Database test</h1>
  <button
    @click="query"
    class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
  >
    database test
  </button>
</template>

<script setup>
import { functions } from '@/main'
import { httpsCallable } from 'firebase/functions'

const query = async () => {
  try {
    const queryFunc = httpsCallable(functions, 'testGetDataFromDatabase')
    const result = await queryFunc()
    console.log(result)
  } catch (error) {
    console.error('Error fetching database data:', error)
  }
}
</script> -->
<template>
  <div>
    <h1>浏览器通知示例</h1>
    <button @click="sendNotification">发送通知</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

// 请求通知权限
onMounted(() => {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'denied') {
        alert('您拒绝了通知权限，无法发送通知。');
      } else if (permission === 'default') {
        alert('请允许通知权限，以便接收通知。');
      }
    });
  } else {
    alert('您的浏览器不支持通知功能。');
  }
});

// 发送通知的方法
const sendNotification = () => {
  if (Notification.permission === 'granted') {
    new Notification('来自Vue3的通知', {
      body: '这是一条通过Vue3 Script Setup发送的通知消息。',
      icon: '/notification_icon.png', // 确保图标路径正确
    });
  } else {
    alert('请先允许通知权限！');
  }
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  border: none;
  background-color: #42b883;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369870;
}
</style>