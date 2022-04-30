<template>
 <div class="reply-report">
   <button class="reply-report-btn btn btn-secondary" @click="$emit('replyReport')">
     <i class='bx-fw bx bx-reply'></i> Balas Laporan
   </button>
 </div>
</template>

<script>
export default {
    name: 'ReplyButton'
}
</script>

<style>

</style>