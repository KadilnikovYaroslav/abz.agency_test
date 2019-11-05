<template>

    <section class="main__about-me about-me container" id="aboutMe">
        <h2 class="about-me__title">Let's get acquainted</h2>
        <div class="about-me__content">
            <div class="about-me__left about-me-left">
                <img src="@/assets/imgs/man-mobile.svg" alt="about me image" class="about-me-left__img">
            </div>
            <div class="about-me__right about-me-right">
                <h3 class="about-me-right__title">I am cool frontend developer</h3>
                <p class="about-me-right__text">When real users have a slow experience on mobile,
                    they're much less likely to find what they are looking for or purchase
                    from you in the future. For many sites this equates to a huge missed
                    opportunity, especially when more than half of visits are abandoned if a
                    mobile page takes over 3 seconds to load.
                    <br>
                    <br>
                    Last week, Google Search and Ads teams announced two new speed initiatives
                    to help improve user-experience on the web.</p>
                <button
                    class="about-me-right__button"
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

    .main__about-me {
        margin-bottom: 123px;
    }

    .about-me__title {
        font-family: "Overpass", "sans-serif";
        font-size: 42px;
        text-align: center;
        margin-bottom: 21px;
    }

    .about-me__content {
        display: flex;
    }

// About me left START

    .about-me-left {
        min-width: 289px;
        margin-right: 30px;
    }

// About me left END


// About me right START

    .about-me-right {
        padding-top: 15px;
    }

    .about-me-right__title {
        font-family: "Overpass", "sans-serif";
        font-size: 26px;
        line-height: 42px;
    }

    .about-me-right__text {
        line-height: 22px;
        color: #4c4b4b;
        margin-bottom: 19px;
    }

    .about-me-right__button {
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 700;
        font-size: 22px;
        color: #ef6c00;
        background-color: transparent;
        transition: all .2s ease-in-out;

        &:hover {
            color: #FC831F;
        }
    }

// About me right END



// Media style for this component AboutMe.vue START

    @import "~@/media css/aboutMe.scss";

// Media style for this component AboutMe.vue END

</style>
