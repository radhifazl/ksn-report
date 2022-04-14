<template>
 <div class="edit-report">
   <button class="delete-report-btn btn btn-success" @click="$emit('editReport')">
     <i class='bx-fw bx bxs-edit'></i> Edit Laporan
   </button>
 </div>
</template>

<script>
export default {
    name: 'UpdateButton'
}
</script>

<style>

</style>