<template>
 <div class="delete-report">
   <button class="delete-report-btn btn btn-danger" @click="$emit('deleteReport')">
     <i class='bx-fw bx bxs-trash'></i> Hapus Laporan
   </button>
 </div>
</template>

<script>
export default {
    name: 'DeleteButton'
}
</script>

<style>

</style>