<template>

    <section class="main__users users container" id="users">

        <div class="users__header">
            <h2 class="users__title">Our cheerful users</h2>
            <div class="users__text-warning">Attention! Sorting users by registration date</div>
        </div>

        <ul class="users__list" ref="usersList">
            <li
                class="users__item"
                ref="usersItem"
                v-for="user in users"
                :key="user.id"
            >
                <div class="users__left">
                    <picture>
                        
                        <source
                            :srcset="user.photo + ' 2x'"
                        >

                        <img :src="user.photo"
                            style="width: 70px; height: 70px;"
                            alt="photo user"
                            class="users__img"
                        >

                    </picture>
                </div>
                <div
                    class="users__right"
                    @mouseover="showTooltips"
                    @mouseout="hideTooltips"
                >
                    <div class="user__info users__name">{{ user.name }}</div>
                    <div class="user__info users__position users__info">{{ user.position }}</div>
                    <div class="user__info users__email users__info">{{ user.email }}</div>
                    <div class="user__info users__telephone users__info">{{ user.phone }}</div>
                </div>
            </li>
        </ul>

        <button
            class="users__button"
            ref="usersButton"
            @click="usersShowMore"
        >Show more</button>

    </section>

</template>

<script>

import { updateListUser } from "@/main";

export default {
    data () {
        return {
            users: [],
            urlNextPageUsersFromApi: null,
            tooltip: '',
            transitionEnd: true
        }
    },
    methods: {
        requestGetUsers ( url ) {

            fetch( url )
            .then( response => response.json() )
            .then( data => {
                
                if( data.success ) {
                    // process success response
                    data.users.forEach( element => {
                        this.users.push( element )
                    } )

                    if( data.links.next_url ){
                        this.urlNextPageUsersFromApi = data.links.next_url
                    }else{
                        this.$refs.usersButton.style.display = "none";
                    }
                } else {
                    // proccess server errors
                    throw new Error('Fail');
                }
            } )

        },
        usersShowMore () {
            this.requestGetUsers ( this.urlNextPageUsersFromApi )
        },
        showTooltips (e) {

            let target = e.target;
            let widthBlock = this.$refs.usersItem[0].scrollWidth;

            if( !target.classList.contains("user__info") ) return;

            if( target.scrollWidth > widthBlock ) {

                let targetText = target.textContent;
                let coords = target.getBoundingClientRect();

                let left = coords.left + "px";
                let top = coords.bottom + "px";

                document.styleSheets[ document.styleSheets.length - 1 ].insertRule(`.user__info-tooltip:before {top: ${top}; left: ${left};}`, 0);

                target.classList.add("user__info-tooltip");
                target.setAttribute("data-tooltip", targetText);
            }
        },
        hideTooltips (e) {
            
            let target = e.target;
            let widthBlock = this.$refs.usersItem[0].scrollWidth;

            if( !target.classList.contains("user__info") ) return;

            if( target.scrollWidth > widthBlock ) {
                document.styleSheets[ document.styleSheets.length - 1 ].deleteRule(0);
            }

        }
    },
    created() {
        updateListUser.$on("updateUser", (url) => {
            this.users = [];
            this.requestGetUsers ( url );
        });
    },
    mounted() {
        if ( window.screen.width > 320 ) {
            this.requestGetUsers ( "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6" );
        }

        if( window.screen.width === 320 ){
            this.requestGetUsers ( "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=3" );
        }
    }
}

</script>

<style scoped lang="scss">

    .users {
        margin-bottom: 154px;
    }

// Users header START

    .users__header {
        text-align: center;
        margin-bottom: 57px;
    }

    .users__title {
        font-family: "Overpass", "sans-serif";
        font-size: 42px;
        margin-bottom: 10px;
    }

    .users__text-warning {
        font-family: "Overpass", "sans-serif";
        font-size: 17px;
    }

// Users header END


// Users list START

    .users__list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 55px;
    }

    .users__item {
        // position: relative;

        display: flex;
        width: 290px;
        margin-right: 30px;
        margin-bottom: 106px;

        &:nth-child(3n+3) {
            margin-right: 0;
        }

        &:nth-last-child(-n+3) {
            margin-bottom: 0;
        }
    }


    // Users left START

        .users__left {
            width: 100%;
            min-width: 70px;
            max-width: 70px;
            margin-right: 7px;
        }

        .users__img {
            border-radius: 50%;
        }

    // Users left END


    // Users right START

        .users__right {
            // max-width: 213px;
            white-space: nowrap;
            overflow: hidden;
            padding-top: 23px;
        }

        .users__name,
        .users__info {
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .users__name {
            font-family: "Overpass", "sans-serif";
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 7px;
        }

        .users__info {
            font-size: 14px;
            color: #4c4b4b;
        }

    // Users right END


    // User tooltip START

        .user__info-tooltip {

            &::before{
                content: attr(data-tooltip);
                position: fixed;
                // position: absolute;
                color: #f7f7f7;
                font-family: 'Source Sans Pro', sans-serif;
                font-weight: 400;
                font-size: 14px;
                background-color: #707070;
                border-radius: 3px;
                box-shadow: 0 2px 5px 0px #00000054;
                padding: 4px 12px;
                box-sizing: border-box;
                opacity: 0;
                z-index: 1;
                transition: opacity .2s ease-in-out;
            }

            &:hover{
                &::before {
                    opacity: 1;
                }
            }
        }

    // User tooltip END

// Users list END


// Users button END

    .users__button {
        display: block;
        width: 290px;
        margin: auto;
        padding: 7px 0;
        font-size: 18px;
        font-weight: 700;
        color: #ef6c00;
        background-color: transparent;
        border: 2px solid #ef6c00;
        border-radius: 3px;
        transition: all .2s ease-in-out;

        &:hover {
            border-color: #FC831F;
            color: #FC831F;
            background-color: #FEE6D2;
        }
    }

// Users button END



// Media style for this component Users.vue START

    @import "~@/media css/users.scss";

// Media style for this component Users.vue END 

</style>
