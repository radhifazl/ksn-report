<template>
  <div class="chat w-100">
      <main class="main d-flex flex-column" @scroll="showScrollbar" :class="{scrolled: isScrolled}">
        <div class="message flex-column gap-1 mb-2" 
            v-for="(msg, i) in messages" 
            :key="i" 
            :class="msg.userUID == user.uid ? 'sender' : 'receiver'"
            id="chat-message"
        >
            <div class="chat-header">
                <span class="sender-name font-title">
                    {{ msg.sender }}
                </span>
            </div>

            <div class="chat d-flex align-items-center gap-1">
                <div class="chat-time font-desc-2">
                    {{ msg.date }}
                </div>
                <div class="chat-text font-desc-2">
                    {{ msg.text }}
                </div>
                <div class="chat-avatar">
                    <img :src="msg.photoURL">
                </div>
                <div class="chat-options-wrapper" v-if="msg.userUID == user.uid"> 
                    <button class="option-btn" @click="deleteMessage(msg.id)">
                        <i class='bx-fw bx bxs-trash'></i>
                    </button>
                </div>
            </div>
        </div>
        <div id="scrollable"></div>
      </main>

      <footer class="footer mt-2">
          <form @submit.prevent="sendMessage" id="msg-form">
              <input type="text" 
                name="message" 
                id="message" 
                placeholder="Masukkan Pesan"
                v-model="msg"
                autocomplete="off" required
              >
              <button class="sendmsg-btn font-desc" type="submit" id="send-msg-btn">
                <i class='bx bxs-send'></i>  Send
              </button>
          </form>
      </footer>
  </div>
</template>

<script>
import { db, auth } from "@/firebase"
import {
    ref, push, set, serverTimestamp, onChildAdded,
    remove, get, onChildRemoved, onValue, child
} from 'firebase/database'

import Swal from "sweetalert2";


export default {
    name:'ChatComp',
    data() {
        return {
            user: auth.currentUser,
            msg: '',
            messages: [],
            isReceiver: true,
            msgSent: false,
            isScrolled: false,
            sender: false,
            isClicked: false,
        }
    },
    mounted() {
        this.messages = []
        this.getMessages()
    },
    methods: {
        async sendMessage() {
            this.msgSent = true
            const { v4: uuid } = require('uuid');
            try {
                const msgRef = ref(db, 'messages')
                const newmsgRef = push(msgRef)
                await set(newmsgRef, {
                    userUID: this.user.uid,
                    sender: this.user.displayName,
                    photoURL: this.user.photoURL,
                    text: this.msg,
                    createdAt: serverTimestamp(),
                    date: this.formatAMPM(new Date()),
                }).then(() => {
                    this.getMessages()
                    setTimeout(() => {
                        this.msgSent = false
                    }, 180000)
                })
                this.msg = ''
                document.getElementById('scrollable').scrollIntoView({ behavior: 'smooth' })
            } catch(error) {
                console.log("Error adding document: " + error.message)
            }
        },
        // async sendMessage() {
        //     this.msgSent = true
        //     try {
        //         const data = {
        //             userUID: this.user.uid,
        //             sender: this.user.displayName,
        //             photoURL: this.user.photoURL,
        //             text: this.msg,
        //             createdAt: serverTimestamp(),
        //             date: this.formatAMPM(new Date()),
        //         }
        //         await push(ref(db, 'messages'), data)
        //             .then(() => {
        //                 setTimeout(() => {
        //                     this.msgSent = false
        //                 }, 180000)
        //             })
        //     } catch(error) {
        //         console.log("Error adding document: " + error.message)
        //     }
        //     this.msg = ''
        // },
        getMessages() {
            // onChildAdded(ref(db, 'messages'), (snapshot) => {
            //     this.messages.push({
            //         id: snapshot.key,
            //         userUID: snapshot.val().userUID,
            //         sender: snapshot.val().sender,
            //         photoURL: snapshot.val().photoURL,
            //         text: snapshot.val().text,
            //         createdAt: snapshot.val().createdAt,
            //         date: snapshot.val().date,
            //     })
            //     console.log(this.messages)
            // })
            onValue(ref(db, 'messages'), (snapshot) => {
                this.messages = []
                snapshot.forEach((childSnapshot) => {
                    this.messages.push({
                        id: childSnapshot.key,
                        userUID: childSnapshot.val().userUID,
                        sender: childSnapshot.val().sender,
                        photoURL: childSnapshot.val().photoURL,
                        text: childSnapshot.val().text,
                        createdAt: childSnapshot.val().createdAt,
                        date: childSnapshot.val().date,
                    })
                })
            })
        },
        deleteMessage(key) {
            Swal.fire({
                title: 'Hapus pesan?',
                text: "Pesan akan terhapus untuk semua orang",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1c1627',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus pesan!'
            }).then((result) => {
                if (result.isConfirmed) {
                    remove(ref(db, `message/${key}`))
                }
            })
        },
        formatAMPM(date) {
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let ampm = hours >= 12 ? 'pm' : 'am'
            hours = hours % 12
            hours = hours ? hours : 12
            minutes = minutes < 10 ? '0' + minutes : minutes
            let strTime = hours + ':' + minutes + ' ' + ampm
            return strTime
        },
        popDelete() {
            if(!this.isClicked) {
                this.isClicked = true
            } else {
                this.isClicked = false
            }
        }
    },
}
</script>

<style lang="scss">
@import "@/styles/base.scss";

.chat {
    height: 100%;

    .main {
        height: 92%;
        padding-top: 1rem;
        padding-bottom: 0.5rem;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;

        .message {
            align-items: flex-end;
            width: 100%;
            animation: slidechat 0.35s ease;
            display: flex;

            @keyframes slidechat {
                from {
                    opacity: 0;
                    transform: translateY(1rem);
                } 
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .chat-header {
                .sender-name {
                    color: #888;
                }
            }

            .chat {
                position: relative;
                &:hover .chat-options-wrapper .option-btn {
                    display: block;
                    visibility: visible;
                    opacity: 1;
                }
                .chat-time {
                    margin: 0 0.5rem;
                    color: #888;
                    font-size: 0.838rem;
                }
                .chat-text {
                    height: fit-content;
                    width: fit-content;
                    background: $primary-color;
                    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
                    border-radius: 10px;
                    color: $white;
                    padding: 0.3rem 1rem;
                }
                .chat-avatar img {
                    width: 30px;
                    border-radius: 50%;
                }
                .chat-options-wrapper {
                    position: relative;
                    .option-btn {
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                        border: none;
                        outline: none;
                        background: transparent;
                        font-size: 1.2rem;
                        display: none;
                        visibility: hidden;
                        opacity: 0;
                    }

                    .delete-button {
                        position: absolute;
                        top: -100%;
                        right: 0;
                        width: 100vw;
                        height: 75vh;
                        background: rgba(56, 56, 56, 0.418);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 1rem;

                        .delete-btn {
                            width: 50%;
                            border: none;
                            outline: none;
                            padding: 0.5rem 1rem;
                        }
                    }
                }
            }
        }

        .message.receiver {
            align-items: flex-start;
            .chat {
                flex-direction: row-reverse;
                .chat-text {
                    background: $white;
                    color: $dark;
                }
            }
        }
    }

    .main::-webkit-scrollbar{
        opacity: 0;
        width: 5px;
    }

    .footer {
        height: 8%;

        #msg-form {
            height: 100%;
            display: flex;
            align-items: center;
            #message, .sendmsg-btn {
                outline: none;
                border: none;
                height: 100%;
                caret-color: $white;
                color: $white;
            }
            #message {
                width: 90%;
                height: 100%;
                padding: 1rem;
                background: $dark;
            }

            .sendmsg-btn {
                width: 10%;
                background: $primary-color;
                cursor: pointer;
            }

            @media screen and (max-width: 768px) {
                #message {
                    width: 70%;
                    height: 100%;
                    padding: 1rem;
                    background: $dark;
                }

                .sendmsg-btn {
                    width: 30%;
                    background: $primary-color;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>