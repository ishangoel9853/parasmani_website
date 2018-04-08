<template lang="html">
  <div id="app">
 <ul id="example-2">
 <li v-for="book in books">
 <b>{{ book.name }}</b> By <i>{{ book.author }}</i>
 <a v-if="isNotComplete(book)">DONE</a>
  <a href="#" @click.prevent = 'remove(book)'>DROP IT</a>
 </li>
 </ul>
</div>
</template>

<script>
export default {

 data() {
   return {
   books: [
     { name : 'The Majesty of Vue.js', author : 'Alex Kyriakidis, Kostas Maniatis and Evan You' , completed : false },
     { name : 'Laravel: Code Bright ', author : 'Dayle Rees' , completed : false },
     { name : 'Laravel: From Apprentice To Artisan', author : 'Taylor Otwell' , completed : false },
     { name : 'Laravel Testing Decoded', author : 'JeffreyWay' , completed : false }
   ]
  }
},
 methods: {
   isNotComplete: function(book){
     return book.completed == false
   },
   remove: function(book){
     console.log(book);

     var idx = this.books.indexOf(book)
     console.log('idx', idx)
     this.books.splice(idx,1)
   }
 }
}
</script>

<style lang="css">
</style>
