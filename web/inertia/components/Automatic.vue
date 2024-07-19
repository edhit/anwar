<script setup>
import { useForm } from '@inertiajs/vue3'

const form = useForm({
  file: null,
  actions: null,
  name: null,
})

function submit() {
  form.post('/automatics')
}

defineProps(['command'])
</script>
<!-- Сделать вкладку удаление файлов из папки UPLOAD -->

<template>
  <form @submit.prevent="submit">
    <div class="container bg-white border border-warning p-5 rounded mb-3">
      <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last"></div>
        <div class="col-md-7 col-lg-8">
          <div class="h4 mb-3">Автоматика</div>
          <div class="row g-3 mb-3">
            <div class="col-12">
              <label for="inputGroupFile01" class="form-label"
                >Вставь файл, который был создан в разделе
                <a href="/popular">популярный товар</a></label
              >
              или в любом другом
              <div class="input-group mb-3">
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile01"
                  @input="form.file = $event.target.files[0]"
                />
                <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                  {{ form.progress.percentage }}%
                </progress>
              </div>
            </div>

            <div class="col-12">
              <label class="form-label"
                >Что делать на странице товара,</label
              >

              <select class="form-select" multiple aria-label="Multiple select example">
                <option value="1">Найти товар с знаком отлличный продовец</option>
                <option value="2">Сравнить цены с ценой поставщика</option>
                <option value="3">Three</option>
              </select>
            </div>

            <!-- потом можно добавить поиск по разным параметрам(количество просмотров, рейтинг итд) -->
            <div class="col-12">
              <label for="name" class="form-label">Название нового файла</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="name"
                @keyup="form.name = $event.target.value"
              />
            </div>
          </div>

          <button class="w-100 btn btn-warning btn-lg" type="submit">Отправить</button>
        </div>
      </div>
    </div>
    <div class="container bg-white border border-warning p-5 rounded mb-3">
      <div class="h4 mb-3">Последние команды</div>
      <table class="table table-striped">
        <thead>
          <th>#</th>
          <th>Команды</th>
          <th>Дата запуска</th>
        </thead>
        <tbody>
          <tr v-for="item in command">
            <td>{{ item.id }}</td>
            <td>{{ item.command }}</td>
            <td>{{ Date(item.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>
