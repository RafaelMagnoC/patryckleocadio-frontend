<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        required: true,
        default: 'digite seu texto'
    }
})

const emit = defineEmits(['update:modelValue'])

function onInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<template>
    <div tabindex="1" class="input-custom">
        <input type="password" :placeholder="placeholder" :value="modelValue" @input="onInput" />
    </div>
</template>

<style lang="sass" scoped>
    @use './InputPasswordComponent.sass'
</style>