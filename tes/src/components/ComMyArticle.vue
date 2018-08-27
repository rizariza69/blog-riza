<template>

    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" data-toggle="modal" data-target="#exampleModal">Add Article</button>

            <table class="table" style="background-color:white">
                <!-- table-responsive -->
                <tr>
                    <td>
                        <strong>Date</strong>
                    </td>
                    <td>
                        <strong>Title</strong>
                    </td>
                    <!-- <td>
                        <strong>Description</strong>
                    </td> -->
                    <td>
                        <strong>Actions</strong>
                    </td>
                </tr>

                <tr v-for="(article,index) in myArticle" :key="index">
                    <td>{{formatDate(article.createdAt)}}</td>
                    <td>t{{article.title}}</td>
                    <!-- <td>{{article.description}}</td> -->
                    <td>
                        <a href="" class="btn btn-success" data-toggle="modal" data-target="#update">UPDATE</a>
                        <a href="" class="btn btn-danger" @click="deleteArticle" style="margin-left: 15px">DELETE</a>
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
                                    <label for="inputArticle">write article</label>
                                    <wysiwyg v-model="myHTML" />
                                </div>

                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" @click="addArticle()">SUBMIT</button>
                            </form>

                        </div>
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

                myHTML:'',
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
                            description: this.myHTML,

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
                let token = localStorage.getItem('token')
                axios({
                        method: "DELETE",
                        url: `http://localhost:3000/articles/getmyarticle/${data}`,
                        headers:{
                            token
                        }
                    })
                    .then(response => {
                        router.push('/getmyarticle')
                    })
            },

            getAllMyArticle() {
                let token = localStorage.getItem('token')
                    axios({
                            method: 'GET',
                            url: 'http://localhost:3000/articles/getmyarticle',
                            headers: {
                                token
                            }
                        })
                        .then(({ data }) => {
                            this.myArticle = data.articles
                            console.log('ini result ===>', data)

                        })
                        .catch((err) => {
                            console.log('error cuy ==>', err)
                        });
            }
        },
        created() {
            this.getAllMyArticle();
        },
        mounted() {
            this.getAllMyArticle();
        },

    }
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>