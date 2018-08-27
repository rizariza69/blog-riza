<template>

    <div class="container">
        <div class="row">
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" data-toggle="modal" data-target="#exampleModal">Add Article</button>

            <table class="table table-hover" style="background-color:white">

                <tr>
                    <td>
                        <strong>Date</strong>
                    </td>
                    <td>
                        <strong>Title</strong>
                    </td>
                    <td>
                        <strong>Description</strong>
                    </td>
                    <td>

                    </td>
                </tr>

                <tr v-for="(article,index) in myArticle" :key="index">
                    <td>{{formatDate(article.createdAt)}}</td>
                    <td>t{{article.title}}</td>
                    <td>{{article.description}}</td>
                    <td>
                        <a href="" class="btn btn-success" data-toggle="modal" data-target="#update">UPDATE</a>|
                        <a href="" class="btn btn-danger" @click="deleteArticle">DELETE</a>
                    </td>

                </tr>
            </table>


            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Article</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="form-signin">

                                <div class="form-label-group">
                                    <input type="text" v-model="title" id="inputName" class="form-control" placeholder="Title" required autofocus>
                                </div>
                                <hr>

                                <div class="form-label-group">
                                    <input type="file" class="form-control" value="upload gambar" placeholder="upload Image" required autofocus/>
                                </div>
                                <hr>

                                <div class="form-label-group">
                                    <label for="inputArticle">write article</label>
                                    <wysiwyg v-model="myHTML" />
                                </div>

                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" @click.prevent="addArticle">SUBMIT</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>



</template>

<script>
    import router from '../router'
    import axios from 'axios'

    export default {
        data() {
            return {
                myArticle: []

            }
        },
        methods: {
            formatDate(date) {
                var monthNames = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ];
                let day = date.slice(8, 10);
                let month = date.slice(6, 7);
                let year = date.slice(0, 4);
                if (month > 9) {
                    month = `1${month}`;
                }
                return day + " " + monthNames[month - 1] + " " + year;
            },
    
            addArticle: function () {

                axios({
                        method: "POST",
                        url: "http://localhost:3000/articles/create",
                        data: {


                            date: this.date,
                            title: this.title,
                            description: this.description,

                        },
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        router.push({
                            name: "home"
                        })


                    }) 
                    .catch(err => {
                        console.log(err);

                    })
            },

            deleteArticle: function (data) {
                axios({
                        method: "DELETE",
                        url: `http://localhost:3000/articles/${data}`
                    })
                    .then(response => {
                        router.push('/myArticles')
                    })
            },
        },
        mounted() {
            // let token = localStorage.getItem('token')
            // axios({
            //         method: 'GET',
            //         url: 'http://localhost:3000/articles/myarticle',
            //         headers: {
            //             token
            //         }
            //     })
            //     .then((result) => {
            //         this.articles = result.data.articles
            //     })
            //     .catch((err) => {});
        }

    }
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>