<template>

    <header class="header" ref="header">

        <div class="container container_flex">

            <div class="header__logo">
                <a href="/#" @click.prevent>
                    <img class="header__img" src="@/assets/logo.svg" alt="abz logo">
                </a>
            </div>

            <div
                class="header__responsive-menu"
                ref="headerResponsiveMenu"
            >

                <nav
                    class="header__nav"
                    ref="headerNav"
                >
                    <ul class="header__nav-list header-nav-list" @click="closeHeaderNavList">
                        <li class="header-nav-list__item">
                            <a href="#aboutMe" class="header-nav-list__link">About me</a>
                        </li>
                        <li class="header-nav-list__item">
                            <a href="#relationships" class="header-nav-list__link">Relationships</a>
                        </li>
                        <li class="header-nav-list__item">
                            <a href="#requirements" class="header-nav-list__link">Requirements</a>
                        </li>
                        <li class="header-nav-list__item">
                            <a href="#users" class="header-nav-list__link">Users</a>
                        </li>
                        <li class="header-nav-list__item">
                            <a href="#registration" class="header-nav-list__link">Sign Up</a>
                        </li>
                        <li class="header-nav-list__item header-nav-list__item_toggle-display">
                            <a href="/#" @click.prevent class="header-nav-list__link">Sign Out</a>
                        </li>
                    </ul>
                </nav>

                <div
                    class="header__user"
                    ref="headerUser"
                >
                    <div class="header__user-info header-user-info">
                        <a href="/#" @click.prevent class="header-user-info__link">
                            <div class="header-user-info__nickname">{{ userHeader.name }}</div>
                            <div class="header-user-info__email">{{ userHeader.email }}</div>
                        </a>
                    </div>
                    <div class="header__user-avatar header-user-avatar">
                        <a href="/#" @click.prevent class="header-user-avatar__link">
                            <picture>
                        
                                <source
                                    :srcset="userHeader.photo + ' 2x'"
                                >

                                <img
                                    class="header-user-avatar__img"
                                    :src="userHeader.photo"
                                    alt="user avatar"
                                    style="width: 40px; height: 40px;"
                                >

                            </picture>
                        </a>
                    </div>
                    <div class="header__user-login header-user-login">
                        <a href="/#" @click.prevent class="header-user-login__link">
                            <svg class="svg header-user-login__link-sign-out">
                                <use xlink:href="#sign-out" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

            <div
                class="header__overlay"
                ref="headerOverlay"
                @click="closeHeaderNavList"
            ></div>

            <button
                class="header__button-menu"
                @click="headerButtonMenuToggle"
            ></button>

        </div>

    </header>

</template>

<script>

    export default {
        data () {
            return {
                userHeader: {
                    name: null,
                    email: null,
                    photo: null
                }
            }
        },
        methods: {
            scrollFixedHeader () {
                const header = this.$refs.header;

                window.addEventListener('scroll', function() {
                    if( pageYOffset > 64 ){
                        header.classList.add("header_fixed");
                    }
                });
            },
            headerButtonMenuToggle () {
                
                const headerResponsiveMenu = this.$refs.headerResponsiveMenu;
                const headerOverlay = this.$refs.headerOverlay;

                headerResponsiveMenu.classList.toggle("header__responsive-menu_tablet");
                headerOverlay.classList.toggle("header__overlay_active");

            },
            closeHeaderNavList (e) {
                
                const target = e.target;
                let link = null;
                let overlay = null;

                if( target.classList.contains("header-nav-list__link") ) link = target;
                if( target.classList.contains("header__overlay") ) overlay = target;

                switch (target) {

                    case link:
                    case overlay:
                        this.$refs.headerResponsiveMenu.classList.remove("header__responsive-menu_tablet");
                        this.$refs.headerOverlay.classList.remove("header__overlay_active");
                        break;
                }

                return false;

            }
        },
        mounted() {

            fetch( 'https://frontend-test-assignment-api.abz.agency/api/v1/users/1' )
            .then( response => response.json() )
            .then( data => {

                if(data.success) {
                    // process success response
                    this.userHeader.name = data.user.name
                    this.userHeader.email = data.user.email
                    this.userHeader.photo = data.user.photo
                } else {
                    // proccess server errors
                    throw new Error("Fail load");
                }
            } )

            window.addEventListener('scroll', () => {
                if( pageYOffset > 64 ){
                    this.$refs.header.classList.add("header_fixed")
                }else {
                    this.$refs.header.classList.remove("header_fixed")
                }
            });
        }
    }

</script>

<style lang="scss">

    .header {
        display: flex;
        min-height: 64px;
        transition: background-color .5s ease-in-out;
    }

    .header_fixed {
        width: 100%;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        z-index: 100;
    }

    .container_flex {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: inherit;
    }


// Header logo and Footer logo.
// This is general styles for header and footer!
// START

    .header__logo,
    .footer-top__logo {
        min-width: 160px;
        width: 160px;
    }

    .header__img,
    .footer-top__logo-img {
        width: 134px;
    }

// Header logo and Footer logo.
// This is general styles for header and footer!
// END



// Header responsive menu START

    .header__responsive-menu {
        width: 730px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header__responsive-menu_tablet {
        display: none;
    }

// Header responsive menu END



// Header navigation and Footer navigation.
// This is general styles for header and footer!
// START

    .header-nav-list,
    .footer-top__nav-list {
        display: flex;
    }

    .header-nav-list__item,
    .footer-top-nav-list__item {
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }

    .header-nav-list__item_toggle-display {
        display: none;
    }

    .header-nav-list__link,
    .footer-top-nav-list__link {
        color: #000;
        transition: all .2s ease-in-out;

        &:hover {
            color: #EF6C00;
        }

        &:active {
            color: #283593;
        }
    }

// Header navigation and Footer navigation.
// This is general styles for header and footer!
// END


// Header user START

    .header__user {
        display: flex;
        align-items: center;
    }

    .header-user-info {
        text-align: end;
        margin-right: 9px;
    }

    .header-user-info__link {
        color: #000;
    }

    .header-user-info__nickname {
        font-size: 14px;
    }

    .header-user-info__email {
        font-size: 12px;
        color: #8d8c8c;
    }

    .header__user-avatar {
        min-width: 40px;
        max-width: 40px;
        margin-right: 13px;
    }

    .header-user-avatar__img {
        border-radius: 50%;
    }

    .header-user-login__link {
        width: 26px;
        height: 21px;
    }

    .header-user-login__link-sign-out {
        fill: #283593;

        &:hover{
            fill: #2638BB;
        }
    }

// Header user END


// Header button menu START

    .header__button-menu {
        display: none;
        width: 30px;
        height: 30px;
        background: url("~@/assets/icons/line-menu.svg") center no-repeat;
    }

// Header button menu END



// Header overlay START

    .header__overlay {
        display: none;
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .header__overlay_active {
        display: block;
    }

// Header overlay END



// Media style for this component Nav.vue START

    @import "~@/media css/nav.scss";

// Media style for this component Nav.vue END

</style>
