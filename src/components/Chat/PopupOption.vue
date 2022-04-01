<template>
  <div class="chat-option-popup">
    <div class="options-box">
      <div class="options">
        <div class="option">
          <button class="chat-option-btn mb-3 delete-for-me-btn" @click="$emit('deleteForMe')">
            Hapus untuk saya
          </button>
        </div>
        
        <slot />
        
        <div class="option cancel" @click="$emit('cancelPopup')">
            Cancel
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PopupOption',
}
</script>

<style lang="scss">
@import "@/styles/base.scss";
.chat-option-popup {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 0;
  height: 100%;
  z-index: 100;
  display: grid;
  place-items: center;
  background: #21202c73;
  transition: all 0.3s ease;

    .options-box {
      padding: 1rem;
      width: 300px;
      height: 200px;
      border-radius: 18px;
      background: linear-gradient(145deg, #21202c, #282534);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
      .options {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .chat-option-btn {
        width: 100%;
        border: 2px solid $white;
        background: transparent;
        outline: none;
        border-radius: 8px;
        padding: 0.3rem 1rem;
        color: $white;
        font-family: $third-font;
        transition: all 0.35s ease;

        &:hover {
          background: $white;
          color: $dark;
        }
      }
      .option.cancel {
        color: $white;
        font-family: $third-font;
        font-weight: 500;
        cursor: pointer;
        transition: 0.35s ease;

        &:hover {
          color: $secondary-color;
        }
      }
  }
}
</style>