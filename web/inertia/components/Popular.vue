<script setup>
import { useForm } from '@inertiajs/vue3'

const form = useForm({
  file: null,
  letter: null,
  price: null,
  type: null,
  opinion: null,
  rate: null,
  name: null,
})

function submit() {
  form.post('/popular')
}

defineProps(['command'])
</script>
<!-- Сделать вкладку удаление файлов из папки UPLOAD -->

<template>
  <form @submit.prevent="submit">
    <div class="container bg-white border border-success p-5 rounded mb-3">
      <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last"></div>
        <div class="col-md-7 col-lg-8">
          <div class="h4 mb-3">Популярный товар</div>
          <div class="row g-3 mb-3">
            <div class="col-12">
              <label for="inputGroupFile01" class="form-label">Вставь файл поставщика</label>
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
              <label for="letter" class="form-label"
                >Выбери букву, где находится штрихкод или SKU</label
              >
              <select
                class="form-select"
                v-model="letter"
                @change="form.letter = $event.target.value"
              >
                <option selected>Open this select menu</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
                <option>G</option>
                <option>H</option>
                <option>I</option>
              </select>
            </div>

            <div class="col-12">
              <label for="price" class="form-label">Выбери букву, где находится цена товара</label>
              <select
                class="form-select"
                v-model="price"
                @change="form.price = $event.target.value"
              >
                <option selected>Open this select menu</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
                <option>G</option>
                <option>H</option>
                <option>I</option>
              </select>
            </div>

            <div class="col-12">
              <div class="form-label">В моем столбце указан:</div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="sku"
                  v-model="type"
                  @click="form.type = $event.target.value"
                />
                <label class="form-check-label" for="inlineRadio1">SKU</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="barcode"
                  v-model="type"
                  @click="form.type = $event.target.value"
                />
                <label class="form-check-label" for="inlineRadio2">Штрихкод</label>
              </div>
            </div>
            <!-- потом можно добавить поиск по разным параметрам(количество просмотров, рейтинг итд) -->
            <div class="col-12">
              <label for="opinion" class="form-label">Всего отзывов на карточке</label>
              <input
                type="text"
                class="form-control"
                id="opinion"
                v-model="opinion"
                @keyup="form.opinion = $event.target.value"
              />
            </div>

            <div class="col-12">
              <label for="customRange1" class="form-label"
                >Искать товары по рейтингу: <b>{{ form.rate }}</b></label
              >
              <input
                type="range"
                class="form-range"
                min="0"
                max="5"
                step="0.1"
                value="3"
                id="customRange1"
                v-model="rate"
                @click="form.rate = $event.target.value"
              />
            </div>

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

          <button class="w-100 btn btn-success btn-lg" type="submit">Отправить</button>
        </div>
      </div>
    </div>
    <div class="container bg-white border border-success p-5 rounded mb-3">
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
