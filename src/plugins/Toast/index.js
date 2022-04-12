import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showCloseButton: true,
    showConfirmButton: false,
    iconColor: "#000",
    timerProgressBar: true,
    timer: 3000,
})

export { Toast }
