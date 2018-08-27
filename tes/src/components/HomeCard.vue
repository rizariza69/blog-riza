<template>
  <div class="container">
    <div class="row">

      <div id="cardArticle" v-for="(data,index) in dataArticle " :key="index" class="col-lg-4 col-md-3 col-sm-6 col-xs-12" >
        <div class="card" style="width: 20rem;">
         <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{data.title}}</h5>
            <p class="card-text">{{data.description}}</p>
            <hr>
            <small>posted {{formatDate(data.createdAt)}}</small>
            <br><hr>
            
            <a href="#" class="btn btn-primary">Continue Read</a>

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
    data(){
        return{
            
            dataArticle:[]
            
        }
    },
    methods:{
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
    },
    mounted(){
      axios({
            method: "GET",
            url: "http://localhost:3000/articles",
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(response => {
            console.log(response)
            this.dataArticle = (response.data.data)  
          })

          .catch(err => {
            console.log(err);

          })

        }

    
    

    

}
</script>

<style>
  .p{
    text-align:justify;
  }
 
 .container{
   padding: 40px
 }


</style>
