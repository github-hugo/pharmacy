var app = new Vue({
    el:'#app',
    data:{
        list:[
            {
                id:1,
                name:'iPhone 8',
                price:6888,
                count:2,
            },
            {
                id:2,
                name:'iPad Pro',
                price:2888,
                count:6,
            },
            {
                id:3,
                name:'MacBook Pro',
                price:10888,
                count:3,
            }
        ],
    },
    created: function(){

    },
    computed:{
        totalPrice: function () {
            var total = 0;
            for(var i=0;i<this.list.length;i++){
                var item=this.list[i];
                total += item.price * item.count;
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
        }
    },
    methods:{
        handReduce: function (index) {
            if(this.list[index].count === 1) return;
            this.list[index].count --;
        },
        handAdd: function (index) {
            this.list[index].count ++;
        },
        handRemove: function (index) {
            this.list.splice(index,1);
        }
    }
});