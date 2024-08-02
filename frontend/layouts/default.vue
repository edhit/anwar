<script setup lang="ts">
const route = useRoute()

const links = [
  [{
    label: 'Главная',
    icon: 'i-streamline:money-bank-institution-money-saving-bank-payment-finance',
    to: '/'
  },{
    label: 'Настройка Яндекс',
    icon: 'i-logos:yandex-ru',
    to: '/yandex'
  }],[{
    label: 'Популярный товар',
    icon: 'i-streamline:shopping-jewelry-diamond-1-diamond-money-payment-finance-wealth',
    to: '/popular'
  },{
    label: 'Стоп-слова',
    icon: 'i-streamline:entertainment-control-button-stop-circle-stop-controls-multi-media-multimedia-button-circle',
    to: '/stopwords'
  }, {
    label: 'Автоматика',
    icon: 'i-streamline:android',
    to: '/automatics'
  }], [{
    label: 'Github',
    icon: 'i-logos:github-icon',
    to: 'https://github.com/edhit/anwar'
  }]
]
</script>

<template>
    <Header />
    <div class="container mx-auto">
        <div class="grid grid-cols-5 divide-x">
            <div class="col-start-1 p-5 ">
<UVerticalNavigation :links="links" />
                
            </div >
            <slot />

        </div>
</div>
<Footer/>
  </template>