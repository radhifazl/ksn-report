<template>
    <div class="detail-kendala-wrapper p-3">
        <div class="detail-kendala">
          <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailKendala'
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

.detail-kendala-wrapper {
    width: 100%;
    margin-top: -1.5rem;
    .detail-kendala {
        background: $white;
        border-radius: 17px;
    }
}
</style>