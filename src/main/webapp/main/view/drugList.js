var app = new Vue({
    el: "#app",
    data: {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
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
                        // alert('请求返回成功！');
                        console.log(result.data);
                        self.tableData = result.data;
                    }
                }
            })


        }
    }

})