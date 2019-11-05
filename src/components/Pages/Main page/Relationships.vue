<template>

    <section class="main__relationships relationships container" id="relationships">
        <h2 class="relationships__title">
            About my relationships with <br>
            web-development
        </h2>
        <ul class="relationships__list">
            <li class="relationships__item">
                <div class="relationships__top">
                    <img src="@/assets/imgs/html.svg" alt="logo html image" class="relationships__img">
                </div>
                <div class="relationships__bottom relationships-bottom">
                    <h3 class="relationships-bottom__title">I'm in love with HTML</h3>
                    <p  class="relationships-bottom__text">Hypertext Markup Language (HTML)
                        is the standard markup language for creating web pages
                        and web applications.
                    </p>
                </div>
            </li>
            <li class="relationships__item">
                <div class="relationships__top">
                    <img src="@/assets/imgs/css.svg" alt="logo css image" class="relationships__img">
                </div>
                <div class="relationships__bottom relationships-bottom">
                    <h3 class="relationships-bottom__title">CSS is my best friend</h3>
                    <p  class="relationships-bottom__text">Cascading Style Sheets (CSS)
                        is a style sheet language used for describing the
                        presentation of a document written in a markup
                        language like HTML.
                    </p>
                </div>
            </li>
            <li class="relationships__item">
                <div class="relationships__top">
                    <img src="@/assets/imgs/javascript.svg" alt="logo javascript image" class="relationships__img">
                </div>
                <div class="relationships__bottom relationships-bottom">
                    <h3 class="relationships-bottom__title">JavaScript is my passion</h3>
                    <p  class="relationships-bottom__text">JavaScript is a high-level, interpreted
                        programming language. It is a language which is also characterized
                        as dynamic, weakly typed, prototype-based and multi-paradigm.
                    </p>
                </div>
            </li>
        </ul>
    </section>

</template>

<style scoped lang="scss">

    .main__relationships {
        margin-bottom: 138px;
    }
  
    .relationships__title {
        font-family: "Overpass", "sans-serif";
        font-size: 42px;
        text-align: center;
        margin-bottom: 40px;
    }

// Relationships list START

    .relationships__list {
        display: flex;
    }

    .relationships__item {
        width: 290px;
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }

    .relationships__top {
        width: 98px;
        margin-bottom: 16px;
    }

    .relationships-bottom__title {
        font-family: "Overpass", "sans-serif";
        font-size: 26px;
        line-height: 47px;
    }

    .relationships-bottom__text {
        color: #4c4b4b;
        line-height: 22px;
    }

// Relationships list END



// Media style for this component Relationships.vue START

    @import "~@/media css/relationships.scss";

// Media style for this component Relationships.vue END

</style>
