<template>

    <section class="main__registration registration container" id="registration">

        <div class="registration__header">
            <h2 class="registration__title">Register to get a work</h2>
            <div class="registration__warning-text">Attention! After successful registration and alert,
                update the list of users in the block from the top
            </div>
        </div>

        <ValidationObserver
            tag="form"
            class="registration__form registration-form"
            ref="registrationFormObserver"
            v-slot="{ valid }"
            @submit.prevent="submit()"
        >

            <div class="registration-form__top">
                
                <div class="registration-form__wrapper-input">
                    <ValidationProvider
                        name="name"
                        mode="eager"
                        rules="required|min:2|max:60"
                        v-slot="{ errors, classes }"
                    >
                        <label
                            for="registrationFormInputName"
                            class="registration-form__label"
                            :class="classes"
                        >Name</label>
                        <input
                            type="text"
                            v-model="veeValidate.name"
                            placeholder="Your name"
                            id="registrationFormInputName"
                            class="registration-form__input"
                            :class="classes"
                        >
                        <!-- <pre>{{ classes }}</pre> -->
                        <span class="registration-form__error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                

                <div class="registration-form__wrapper-input">
                    <ValidationProvider
                        name="email"
                        mode="eager"
                        tag="div"
                        rules="required|email"
                        v-slot="{ errors, classes }"
                    >
                        <label
                            for="registrationFormInputEmail"
                            class="registration-form__label"
                            :class="classes"
                        >Email</label>
                        <input
                            type="email"
                            v-model="veeValidate.email"
                            placeholder="Your email"
                            id="registrationFormInputEmail"
                            class="registration-form__input"
                            :class="classes"
                        >
                        <span class="registration-form__error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="registration-form__wrapper-input">
                    <ValidationProvider
                        name="phone"
                        mode="eager"
                        :rules="{ required: true, regex: /^[\+]{0,1}380([0-9]{9})$/ }"
                        v-slot="{ errors, classes }"
                    >
                        <label
                            for="registrationFormInputPhone"
                            class="registration-form__label"
                            :class="classes"
                        >Phone</label>
                        <input
                            type="tel"
                            id="registrationFormInputPhone"
                            class="registration-form__input"
                            :class="classes"
                            ref="registrationFormInputPhone"
                            @focus="val"
                            @input="val"
                            v-model="veeValidate.phone"
                            placeholder="+380"
                        >
                        <span class="registration-form__error-message">{{ errors[0] }}</span>
                    </ValidationProvider>
                    
                </div>

            </div>

            <div class="registration-form__bottom">

                <div class="registration-form__select-wrapper">
                    <ValidationProvider
                        tag="div"
                        name="selectedPosition"
                        rules="required"
                        v-slot="{ errors, classes }"
                    >
                        <label
                            for="inputPosition"
                            class="registration-form__selected-position"
                            :class="classes"
                            ref="registrationFormSelectedPosition"
                            @click="registrationFormSelectedPosition"
                        >{{ selectedPosition ? selectedPosition : 'Select your position' }}</label>
                        <input
                            type="text"
                            id="inputPosition"
                            ref="inputPosition"
                            :class="classes"
                            v-model="selectedPosition"
                            disabled="disabled">
                        <ul
                            class="registration-form__select-list registration-form-select-list"
                            ref="registrationFormSelectList"
                            @click="registrationFormSelectList"
                        >
                            <li
                                class="registration-form-select-list__item"
                                v-for="position in positionsUsers"
                                :key="position.id"
                                :data-position="position.id"
                            >{{ position.name }}</li>
                        </ul>
                        <span class="registration-form__error-message registration-form__error-message_bottom">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="registration-form__wrapper-input registration-form__wrapper-input_size">
                    <div class="registration-form__wrapper-input-file input-file">
                        
                        <ValidationProvider
                            name="photo"
                            tag="div"
                            class="input-file__inner-wrapper"
                            ref="inputFileProvider"
                            rules="required|size:5000|resolution"
                            v-slot="{ errors, classes, validate, valid }"
                        >
                            <div
                                class="input-file__upload-name"
                                :class="classes"
                            >
                                <span>{{ nameUploadFile ? nameUploadFile : "Upload your photo" }}</span>
                            </div>
                            <label
                                for="inputFile"
                                class="input-file__label"
                                ref="inputFileLabel"
                            ><span>Upload</span></label>
                            <input
                                type="file"
                                id="inputFile"
                                ref="inputFile"
                                accept=".jpg, .jpeg"
                                @change="validate"
                                @getValidNameLoadFile="setNameUploadFile"
                            >
                            <span class="registration-form__error-message">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="registration-form__rule-upload-img">
                        File format jpg  up to 5 MB, the minimum size of 70x70px
                    </div>
                </div>

            </div>

            <button
                :class="{ 'registration-form__button-submit_valid': valid }"
                class="registration-form__button-submit"
                ref="registrationFormButtonSubmit"
            >Sign Up</button>

        </ValidationObserver>

        <div class="registration__overlay registration-overlay" ref="registrationOverlay">
            <div class="registration-overlay__message" ref="registrationOverlayMessage">
                <h3 class="registration-overlay__title">{{ registrationUserMessage.success ? "Congratulations" : "Error" }}</h3>
                <div class="registration-overlay__text">{{ registrationUserMessage.message }}</div>
                <button class="registration-overlay__button" @click="registrationOverlayButtonConsent">ok</button>
            </div>
        </div>

    </section>

</template>

<script>

import { ValidationProvider, ValidationObserver } from "vee-validate";
import { updateListUser } from "@/main";

export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data () {
        return {
            valid: false,
            veeValidate: {
                name: "",
                email: "",
                phone: "",
                selectedPositionId: null,
                photo: ""
            },
            selectedPosition: "",
            positionsUsers: [],
            nameUploadFile: "",
            registrationUserMessage: {},
        }
    },
    methods: {
        val (e) {
            let inputValue =  this.veeValidate.phone;

            if(inputValue === "" || inputValue.length < 5) {
                this.veeValidate.phone = "+380";
            }

            if(inputValue.length > 13) {
               this.veeValidate.phone = inputValue.slice(0, 13);
            }
            
        },
        registrationFormSelectedPosition () {
            let list = this.$refs.registrationFormSelectList;
            let carret = this.$refs.registrationFormSelectedPosition;

            carret.classList.toggle("registration-form__selected-position_active");
            list.classList.toggle("registration-form-select-list_active");
        },
        registrationFormSelectList (e) {
            let target = e.target;
            let list = this.$refs.registrationFormSelectList;
            let listArr = [...list.children];
            let carret = this.$refs.registrationFormSelectedPosition;

            carret.classList.remove("registration-form__selected-position_active");
            list.classList.remove("registration-form-select-list_active");


            listArr.forEach( item => {

                item.classList.remove("registration-form-select-list__item_color");

                if( !target.classList.contains("registration-form-select-list__item_color") ) {
                    target.classList.add("registration-form-select-list__item_color");
                }

            } );

            this.selectedPosition = target.textContent;
            this.veeValidate.selectedPositionId = target.dataset.position;
        },
        setNameUploadFile(e) {
            this.nameUploadFile = e.detail.name;
        },
        async submit() {

            const isValid = await this.$refs.registrationFormObserver.validate();
            const registrationOverlay = this.$refs.registrationOverlay;
            const registrationOverlayMessage = this.$refs.registrationOverlayMessage;
            let result = null;

            if (!isValid) {
                return false;
            }else {
                let fileField = this.$refs.inputFile;
                this.veeValidate.photo = fileField.files[0];
                result = await this.veeValidate;
            }

            
            // Ship it. Sending to API... START

                // Get token START

                let token = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
                .then( response => response.json() )
                .then( data => data.token )
                .catch( error => error );

                // Get token END


                // Sending request for new user START

                var formData = new FormData();
                formData.append('name', result.name);
                formData.append('email', result.email);
                formData.append('phone', result.phone);
                formData.append('position_id', result.selectedPositionId);
                formData.append('photo', result.photo);

                let postNewUser = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Token': token
                    }
                })
                .then( async response => {
                    if(response.ok) {
                        this.registrationUserMessage = await response.json();
                        registrationOverlay.classList.add("registration__overlay_active");
                        return this.registrationUserMessage;
                    }else {
                        this.registrationUserMessage = await response.json();
                        registrationOverlay.classList.add("registration__overlay_active");
                        registrationOverlayMessage.classList.add("registration-overlay__message_active-error");
                        return response.status;
                    }
                })
                .then( data => {
                    if(data.success) {
                        updateListUser.$emit('updateUser', "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6");
                    } else {
                        // proccess server errors
                        console.log(data);
                    }
                })
                .catch( error => error );

                // Sending request for new user END



                // Reset the values ... START

                this.veeValidate.name = "";
                this.veeValidate.email = "";
                this.veeValidate.phone = "";
                this.veeValidate.selectedPosition = "";

                // You should call it on the next frame
                requestAnimationFrame(() => {
                    this.$refs.registrationFormObserver.reset();
                });

                // Reset the values ... END


            // Ship it. Sending to API... END
        },
        registrationOverlayButtonConsent () {
            this.$refs.registrationOverlay.classList.remove("registration__overlay_active");
            this.$refs.registrationOverlayMessage.classList.remove("registration-overlay__message_active-error");
        }
    },
    mounted () {

        // Get position users START

        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        .then( response => response.json() )
        .then( data => {
            // process success response
            data.positions.forEach( element => this.positionsUsers.push(element) )
        });

        // Get position users END

    }
}

</script>

<style scoped lang="scss">

    .main__registration {
        margin-bottom: 140px;
    }

// Registration header START

    .registration__header {
        text-align: center;
        margin-bottom: 62px;
    }

    .registration__title {
        font-family: "Overpass", "sans-serif";
        font-size: 42px;
        margin-bottom: 10px;
    }

    .registration__warning-text {
        font-size: 18px;
    }

// Registration header END


// Registration form START

    .registration-form__top,
    .registration-form__bottom {
        display: flex;
    }

    .registration-form__top {
        margin-bottom: 39px;
    }

    .registration-form__bottom {
        margin-bottom: 40px;
    }


    .registration-form__wrapper-input {
        position: relative;
        width: 290px;
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }



    .registration-form__label {
        position: absolute;
        top: -7px;
        left: 13px;
        font-size: 12px;
        color: #8d8c8c;
        background-color: #fff;
        padding: 0 5px;
    }

    .registration-form__input {
        width: 100%;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 15px;
        border: 1px solid #b7b7b7;
        border-radius: 3px;
        
        color: #8d8c8c;
        padding: 18px 16px;
        box-sizing: border-box;

        &::placeholder {
            color: #8d8c8c;
        }
    }

    .registration-form__input_hidden {
        position: absolute;
        left: -9999px;
        opacity: 0;
        visibility: visible;
    }

    // Color error message style START

    .registration-form__input.invalid {
        border-color: #F44336;
    }

    .registration-form__label.invalid {
        color: #F44336;
    }

    .registration-form__selected-position.invalid,
    .input-file__upload-name.invalid {
        border-color: #F44336;
    }

    .registration-form__error-message {
        position: absolute;
        bottom: -20px;
        left: 17px;
        font-size: 12px;
        color: #F44336;
    }

    .registration-form__error-message_bottom {
        bottom: 0;
    } 

    // Color error and message style END

    
    // Select list START

        #inputPosition {
            position: absolute;
            opacity: 0;
            visibility: visible;
        }

        .registration-form__select-wrapper {
            position: relative;
            width: 50%;
            margin-right: 3%;
        }

        .registration-form__selected-position {
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            user-select: none;
            font-size: 16px;
            border: 1px solid #b7b7b7;
            background-color: #fff;
            border-radius: 3px;
            box-sizing: border-box;
            padding: 17px 17px;
            z-index: 2;

            &::after {
                content: '';
                display: block;
                width: 19px;
                height: 16px;
                background: url("~@/assets/icons/caret-down.svg") center no-repeat;
                transition: all .3s ease-in-out;
            }
        }

        .registration-form__selected-position_active {
            &::after {
                transform: rotateX(180deg);
            }
        }

        .registration-form-select-list {
            width: 100%;
            position: absolute;
            opacity: 0;
            visibility: hidden;
            background-color: #fff;
            border-radius: 3px;
            box-shadow: 0 1px 5px 0 #00000021;
            transform: translateY(-15px);
            transition: all .2s ease-in-out;
            z-index: 1;
        }

        .registration-form-select-list_active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0px);
        }

        .registration-form-select-list__item {
            padding: 12px 18px;
            cursor: pointer;

            &:hover{
                background-color: #FCE2CC;
            }
        }

        .registration-form-select-list__item_color {
            color: #EF6C00;
        }


    // Select list END



    // Input file START

        .input-file__inner-wrapper {
            width: 100%;
            display: flex;
        }

        .registration-form__wrapper-input_size {
            width: 50%;
        }

        .input-file {
            display: flex;
            margin-bottom: 5px;
        }

        .input-file__upload-name {
            width: 320px;
            display: flex;
            align-items: center;
            padding: 0 17px;
            color: #b7b7b7;
            box-sizing: border-box;
            border: 1px solid #b7b7b7;
            border-right: none;
            border-radius: 3px 0 0 3px;

            white-space: nowrap;
            overflow: hidden;

            span {
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .input-file__label {
            min-width: 132px;
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            padding: 13px 0;
            color: #EF6C00;
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
            border: 2px solid #EF6C00;
            border-radius: 0 3px 3px 0;
            transition: all .2s ease-in-out;

            &:hover {
                border-color: #FC831F;
                color: #FC831F;
                background-color: #FEE6D2;
            }
        }

        #inputFile {
            display: none;
        }

        .registration-form__rule-upload-img {
            font-size: 12px;
            color: #b7b7b7;
            padding: 0 17px;
        }

    // Input file END

    .registration-form__button-submit {
        width: 290px;
        display: block;
        margin: auto;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 20px;
        font-weight: 600;
        background-color: #d7d7d7;
        color: #8D8C8C;
        border-radius: 3px;
        padding: 8px 0;
        cursor: pointer;
        transition: all .3s ease-in-out;
    }

    .registration-form__button-submit_valid {
        background-color: #ef6c00;
        color: #fff;

        &:hover {
            background-color: #FC831F;
        }
    }


// Registration form END



// Registration overlay START

    .registration__overlay {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(22, 12, 13, 0.3);
        z-index: 100;
        display: none;
    }

    .registration__overlay_active {
        display: flex;
    }

    .registration-overlay__message {
        width: 290px;
        background-color: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 25px 25px 25px 25px;
    }

    .registration-overlay__message_active-error {
        border: 1px solid red;
    }

    .registration-overlay__title {
        font-family: 'Overpass', sans-serif;
        font-size: 22px;
        margin-bottom: 7px;
    }

    .registration-overlay__text {
        width: 80%;
        color: #393939;
        margin-bottom: 40px;
    }

    .registration-overlay__button {
        width: 100%;
        font-size: 20px;
        font-weight: 600;
        background-color: transparent;
        color: #ef6c00;
        text-align: right;
        text-transform: uppercase;
    }

// Registration overlay END



// Media style for this component Registration.vue START

    @import "~@/media css/registration.scss";

// Media style for this component Registration.vue END

</style>
