<template>
    <div class="detail-header text-center w-100 p-3">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'DetailHeader'
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.detail-header {
    background: $dark;
    border-radius: 17px 17px 0 0;
    h3 {
        color: $secondary-color;
    }
    .date {
        color: $gray;
    }
}
</style>