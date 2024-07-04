<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from './../components/Navbar.vue';
import Footer from './../components/Footer.vue';
import Stopwords from './../components/Stopwords.vue';

import { InferPageProps } from '@adonisjs/inertia/types'
import type { StopwordsController } from '../controllers/stopwords_controller.ts'

defineProps<{
        commands: InferPageProps<StopwordsController, 'index'>

}>()
</script>

<template>
    <Head title="Популярный товар" />
    <Navbar />
    <main>
        <Stopwords :command="commands"/>
    </main>
    <Footer />
</template>