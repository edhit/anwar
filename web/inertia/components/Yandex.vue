<script setup>
import { reactive } from 'vue'
import { router } from '@inertiajs/vue3'

const form = reactive({
  cookie: null,
  sk: null,
  businessid: null
})

function submit() {
  router.post('/yandex', form)
}

defineProps(['cookie', 'sk', 'businessid'])
</script>

<template>
  <form @submit.prevent="submit">
  <div class="container bg-white border border-danger p-5 rounded mb-3">
      <div class="h4 mb-3">Настройки Яндекс</div>
        <div class="mb-3">
          <label class="form-label">Вставь COOKIE из Яндекса</label>
          <div class="input-group">
              <span class="input-group-text" >COOKIE</span>
              <textarea class="form-control" v-model="form.cookie" rows="3"></textarea>
          </div>
        </div>
<div class="mb-3">
  <label class="form-label">Вставь SK из Яндекса</label>
  <div class="input-group">
    <span class="input-group-text" >SK - secret key</span>
    <input type="text" class="form-control" v-model="form.sk">
  </div>
</div>
<div class="mb-3">
  <label class="form-label">Вставь businessid из Яндекса</label>
  <div class="input-group">
    <span class="input-group-text" >businessid</span>
    <input type="text" class="form-control" v-model="form.businessid">
  </div>
</div>
<div class="mb-3">
 <button type="submit" class="btn btn-danger btn-lg mb-3">Отправить</button>
</div>
</div>
<div class="container bg-white border border-danger p-5 rounded mb-3">
  <table class="table">
  <tbody>
    <tr>
      <td><b>COOKIE</b></td>
      <td><p class="text-break">{{cookie}}</p></td>
    </tr>
    <tr>
      <td><b>SK-secret_key</b></td>
      <td><p class="text-break">{{sk}}</p></td>
    </tr>
    <tr>
      <td><b>businessid</b></td>
      <td><p class="text-break">{{businessid}}</p></td>
    </tr>
  </tbody>
</table>
</div>
  </form>
</template>