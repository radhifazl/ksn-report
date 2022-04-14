<template>
  <div class="submitlaporan-button d-flex justify-content-between align-items-center">
    <slot/>
   </div>
</template>

<script>
export default {
    name: 'SubmitButton',
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
  .submitlaporan-button {
    .submitlaporan-btn {
      border: none;
      border-radius: 5px;
      background: $dark;
      color: $white;
      font-family: $second-font;
      font-weight: 400;
      padding: 0.8rem 0;
      font-size: 0.83rem;
      transition: 0.35s ease;

      &:hover {
        background: #353244;
        color: $white;
      }
    }

    span {
      color: #888;
      font-family: $third-font;
    }
  }
</style>