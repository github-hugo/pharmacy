var app = new Vue({
    el: "#app",
    data: {

    },
    created: function () {
        this.initTable();
    },
    methods:{
        initTable: function () {
            var self = this;
            $.ajax({
                url:'/medicine/list',
                dataType:'json',
                data:'',
                type:'post',
                success: function (result) {
                    if(result.success == true){
                        alert('请求返回成功！');
                    }
                }
            })


        }
    }

})