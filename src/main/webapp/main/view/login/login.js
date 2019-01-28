var vue = new Vue({
    el: '#app',
    data: {
        loginLoading: false,
        openAnomalyLoginCheck: false,
        imgUrl: GLOBAL_CONFIG.webSiteRoot + '/userLogin?method=getVerificationCodeView&etc=' + new Date().getTime(),
        smsBtnMsg: '',
        smsBtnShow: true,
        smsSecond: 120,
        smsTimer: null,
        loginForm: {
            userId: '',
            password: '',
        },
        loginRule: {
            userId: [
                {validator: validateuserid, trigger: 'blur'}
            ],
            password: [
                {validator: validatePassword, trigger: 'blur'}
            ],
        },
        useridMsg:'',
        passwordMsg:'',
        verificationCodeMsg:'',
        smsCodeMsg:'',
    },
    computed: {
        loginBtnMsg: function () {
            if(this.loginLoading){
                return '登录中...';
            }else{
                return '登  录';
            }
        },
        bgImgClass: function () {
            return 'a' + GLOBAL_CONFIG.areaCode;
        }
    },
    methods: {
        // changeImgValidate: function () {
        //     this.imgUrl = '/userLogin?method=getVerificationCodeView&etc=' + new Date().getTime();
        // },
        resetValidate: function (msgKey) {
            if(this[msgKey] != ''){
                this[msgKey] = '';
                this.$refs['loginForm'].clearValidate();
            }
        },
        submitForm: function (formName) {
            var self = this;
            self.loginLoading = true;
            self.$refs[formName].validate(function (valid) {
                if (valid) {
                    $.ajax({
                        async: true,
                        url: GLOBAL_CONFIG.webSiteRoot + "/system/login/login?etc=" + new Date().getTime(),
                        dataType:"json",
                        data: {
                            "userId": self.loginForm.userId,
                            "password": md5(self.loginForm.password),
                        },
                        success: function (result) {
                            // self.changeImgValidate();
                            if (result.success) {
                                top.location = result.extend.homeUrl + "?ticketId=" + result.obj.ticketId;
                                return;
                            }else{
                                self.$message.error(result.msg);
                            }
                            self.loginLoading = false;
                        }
                    });
                } else {
                    this.loginLoading = false;
                    return false;
                }
            }.bind(this));
        },
        resetForm: function (formName) {
            this.$refs[formName].resetFields();
        },
    }
});

function validateuserid(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入用户名!'));
    } else {
        callback();
    }
}
function validatePassword(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        callback();
    }
}
