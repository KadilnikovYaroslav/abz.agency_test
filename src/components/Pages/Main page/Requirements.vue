<template>

    <section class="main__requirements requirements" id="requirements">

        <div class="container">

            <h2 class="requirements__title">General requirements for the test task</h2>

            <div class="requirements__content">

                <div class="requirements__left requirements-left">
                    <p class="requirements-left__text">
                        Users want to find answers to their questions quickly and data shows that people
                        really care about how quickly their pages load. The Search team announced speed
                        would be a ranking signal for desktop searches in 2010 and as of this month
                        (July 2018), page speed will be a ranking factor for mobile searches too.
                        <br>
                        <br>
                        If you're a developer working on a site, now is a good time to evaluate your
                        performance using our speed tools. Think about how performance affects the user
                        experience of your pages and consider measuring a variety of real-world
                        user-centric performance metrics.
                        <br>
                        <br>
                        Are you shipping too much JavaScript? Too many images? Images and JavaScript
                        are the most significant contributors to the page weight that affect page load
                        time based on data from HTTP Archive and the Chrome User Experience Report - our 
                        public dataset for key UX metrics as experienced by Chrome users under real-world
                        conditions.
                    </p>
                </div>

                <div class="requirements__right requirements-right">
                    <picture>

                        <source
                            srcset="@/assets/imgs/man-laptop-v1.svg 1x"
                            media="(max-width: 670px)"
                        >

                        <source
                            srcset="@/assets/imgs/man-laptop-v2.svg 1x"
                            media="(max-width: 783px)"
                        >
                        
                        <img src="@/assets/imgs/man-laptop-v1.svg" alt="" class="requirements-right__img">

                    </picture>
                </div>

            </div>
        </div>

    </section>

</template>

<style scoped lang="scss">

    .requirements {
        display: block;
        background: url("~@/assets/imgs/third-block-bg/third-block-bg-1024x755.jpg") center no-repeat;
        padding-top: 133px;
        padding-bottom: 134px;
        margin-bottom: 135px;
    }

    .requirements__title {
        font-family: "Overpass", "sans-serif";
        font-size: 42px;
        color: #fff;
        text-align: center;
        margin-bottom: 38px;
    }

    .requirements__content {
        display: flex;
        justify-content: space-between;
    }

// Requirements left START

    .requirements-left {
        width: 448px;
    }

    .requirements-left__text {
        color: #fff;
        line-height: 22px;
    }

// Requirements left END


// Requirements right START

    .requirements-right {
        padding-top: 14px;
    }

// Requirements right END



// Media style for this component Requirements.vue START

    @import "~@/media css/requirements.scss";

// Media style for this component Requirements.vue END

</style>
