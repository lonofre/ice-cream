<template>
    <NuxtLayout :name="layout">
        <div>
            <div class="w-10 mx-auto">
                <h2 class="font-bold">Su orden</h2>
                <OrderSection :orderList="newItems" :addToOrder="true">Para enviar a cocina</OrderSection>
                <OrderSection :orderList="ordenados" :addToOrder="false">Ya ordenados</OrderSection>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>

const layout = 'client'
/* definePageMeta({
    middleware: ['check-auth', 'is-tablet_master', 'check-session']
}) */
// Los elementos a agregar a la orden
const newItems = [{
    id:1,
    quantity:1
}, {
    id:2,
    quantity:3
}]
// Los elementos que ya estan en la orden
const ordenados = [{
    id: 1,
    quantity:4
}, {
    id:2,
    quantity:3
}
]
</script>

<style lang="scss" scoped></style>