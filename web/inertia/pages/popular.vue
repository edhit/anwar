<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from './../components/Navbar.vue';
import Footer from './../components/Footer.vue';
import Popular from './../components/Popular.vue';

import { InferPageProps } from '@adonisjs/inertia/types'
import type { PopularsController } from '../controllers/populars_controller.ts'

defineProps<{
    // commands: InferPageProps<PopularsController, 'index'>['command']
        commands: InferPageProps<PopularsController, 'index'>

}>()
</script>

<template>
    <Head title="Популярный товар" />
    <Navbar />
    <main>
        <Popular :command="commands"/>
    </main>
    <Footer />
</template>