<template>
  <div class="submitlaporan-button">
    <button type="submit" class="submitlaporan-btn">
      <i class='bx-fw bx bxs-send'></i> Submit Laporan
    </button>
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
      transition: 1s ease;
    }
  }
</style>