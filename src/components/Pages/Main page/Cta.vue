<template>

    <section class="main__cta">
        <div class="container">
            <div class="cta">
                <h1 class="cta__title">Test assignment for Frontend Developer position</h1>
                <p class="cta__text">We kindly remind you that your test assignment
                    should be submitted as a link to github/bitbucket repository.
                    <span class="cta__inner-text">Please be patient, we consider and respond to every application
                    that meets minimum requirements. We look forward to your submission.
                    Good luck!</span>
                </p>
                <button
                    class="cta__button"
                    @click="scrollToRegistration"
                >Sign Up</button>
            </div>
        </div>
    </section>

</template>

<script>

import zenscroll from "zenscroll"

export default {

    methods: {
        scrollToRegistration () {
            let registration = document.getElementById("registration");
            zenscroll.to(registration); // Zenscroll is lib for smooth-scroll.
        }
    }
}

</script>

<style scoped lang="scss">

// Main cta START

    .main__cta {
        display: block;
        background: url("~@/assets/imgs/banner-bg/banner-bg-1024x725.jpg") center no-repeat;
        margin-bottom: 133px;
    }

// Main cta END


// Cta START

    .cta {
        width: 450px;
        padding-top: 133px;
        padding-bottom: 157px;
    }

    .cta__title {
        font-family: "Overpass", "sans-serif";
        font-weight: 400;
        font-size: 50px;
        line-height: 60px;
        color: #fff;
        margin-bottom: 18px;
    }

    .cta__text {
        font-size: 20px;
        color: #fff;
        margin-bottom: 46px;
    }

    .cta__button {
        width: 290px;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        background-color: #ef6c00;
        border-radius: 4px;
        padding: 8px 0;
        transition: all .2s ease-in-out;

        &:hover {
            background-color: #FC831F;
        }
    }

// Cta END



// Media style for this component Cta.vue START

    @import "~@/media css/cta.scss";

// Media style for this component Cta.vue END

</style>
