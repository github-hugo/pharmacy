var vue = new Vue({
    el: '#app',
    data: {
        loginLoading: false,
        openAnomalyLoginCheck: false,
        imgUrl: '/userLogin?method=getVerificationCodeView&etc=' + new Date().getTime(),
        smsBtnMsg: '',
        smsBtnShow: true,
        smsSecond: 120,
        smsTimer: null,
        loginForm: {
            phoneNum: '',
            password: '',
            passwordCheck: '',
            verificationCode: '',
            smsCode: ''
        },
        loginRule: {
            phoneNum: [
                {validator: validatephoneNum, trigger: 'blur'}
            ],
            password: [
                {validator: validatePassword, trigger: 'blur'}
            ],
            passwordCheck: [
                {validator: validatePasswordCheck, trigger: 'blur'}
            ],
            verificationCode: [
                {validator: validateVerificationCode, trigger: 'blur'}
            ],
            smsCode: [
                {validator: validateVerificationCode, trigger: 'blur'}
            ]
        },
        phoneNumMsg:'',
        passwordMsg:'',
        verificationCodeMsg:'',
        smsCodeMsg:'',
    },
    computed: {
        verificationCodeUrl: {
            get: function () {
                return this.imgUrl;
            },
            set: function (url) {
                this.imgUrl = url;
            }
        },
        loginBtnMsg: function () {
            if(this.loginLoading){
                return '重置密码中...';
            }else{
                return '重置密码';
            }
        },
        bgImgClass: function () {
            return 'a' + GLOBAL_CONFIG.areaCode;
        }
    },
    mounted: function () {
        $("input:password").bind("copy cut paste",function(e){
            return false;
        });
    },
    methods: {
        changeImgValidate: function () {
            this.imgUrl = '/userLogin?method=getVerificationCodeView&etc=' + new Date().getTime();
        },
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
                        url: "/userLogin/resetPassword?etc=" + new Date().getTime(),
                        data: {
                            "phoneNum": self.loginForm.phoneNum,
                            "password": FWRSAHelper.encrypt(self.loginForm.password),
                            "verificationCode": self.loginForm.verificationCode,
                            "smsCode": self.loginForm.smsCode
                        },
                        success: function (result) {
                            var obj = result;
                            if (result.status == 1 && obj.data.isResetSuccess) {
                                self.$message({
                                    type:'success',
                                    message:"密码重置成功，即将跳转至登录页面...",
                                    onClose:function () {
                                        window.location = "./login.jsp?etc=" + new Date().getTime();
                                    }
                                });
                                return;
                            }
                            self.changeImgValidate();
                            if(result.data.checkVerificationCodeError){
                                self.verificationCodeMsg = result.data.msg;
                            }else if (obj.data.checkSmsCodeError) {
                                self.smsCodeMsg = result.data.msg; ;
                            } else if (result.status != 1){
                                self.$message.error(result.data.msg);
                            } else {
                                self.$message.error("对不起,重置密码发生了异常,请稍后再重试，或联系客服!");
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
        getSmsCode: function (formName) {
            var self = this;
            var isValidateOk = false;
            self.smsBtnShow = false;
            self.$refs[formName].validateField('phoneNum', function (errorMessage) {
                if (errorMessage) {
                    isValidateOk = true;
                }
            }.bind(this));
            self.$refs[formName].validateField('verificationCode', function (errorMessage) {
                if (errorMessage) {
                    isValidateOk = true;
                }
            }.bind(this));

            if(isValidateOk){
                self.smsBtnShow = true;
                return;
            }

            $.ajax({
                url: "/userLogin/checkVerificationCodeAndExistsPhone",
                async: true,
                data: {
                    phoneNum: self.loginForm.phoneNum,
                    verificationCode: self.loginForm.verificationCode
                },
                success: function (result) {
                    if (result.data.checkVerificationCodeError || result.data.isNotRegistered || result.status != 1) {
                        if (result.data.checkVerificationCodeError) {
                            self.verificationCodeMsg = result.data.msg;
                        } else if(result.data.isNotRegistered){
                            self.phoneNumMsg = result.data.msg;
                        } else {
                            self.$message.error(result.data.msg);
                        }
                        self.smsBtnShow = true;
                        self.changeImgValidate();
                        self.$refs[formName].clearValidate();
                        return;
                    } else {
                        self.sendSmsCode();
                    }
                }
            });
        },
        sendSmsCode: function () {
            this.smsBtnMsg = "验证发送中...";
            $.ajax({
                async: true,
                url: "/userLogin/getIdentifyCodeForResetPassword?etc=" + new Date().getTime(),
                data: {
                    "phoneNum": this.loginForm.phoneNum
                },
                success: function (result) {
                    var obj = result;
                    if (obj.status != 1) {
                        this.$message.error('获取验证码出错，请稍后重试！');
                        this.smsBtnShow = true;
                        this.smsBtnMsg = '';
                        return;
                    }
                    this.startTimer();
                }.bind(this)
            });
        },
        startTimer: function () {
            var TIME_COUNT = 120;
            if (!this.smsTimer) {
                this.smsSecond = TIME_COUNT;
                this.smsBtnMsg = this.smsSecond + "秒";
                this.smsTimer = setInterval(function () {
                    if (this.smsSecond > 1 && this.smsSecond <= TIME_COUNT) {
                        this.smsSecond--;
                        this.smsBtnMsg = this.smsSecond + "秒";
                    } else {
                        this.smsBtnShow = true;
                        clearInterval(this.smsTimer);
                        this.smsTimer = null;
                    }
                }.bind(this), 1000)
            }
        }
    }
});

function validatephoneNum(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入手机号!'));
    } else if (!phoneNumReg1.test(value)) {
        callback(new Error('手机号码只能以数字1开头!'));
    } else if (!phoneNumReg2.test(value)) {
        callback(new Error('手机号码只能是数字!'));
    } else if (!phoneNumReg3.test(value)) {
        callback(new Error('手机号码必须是11位数字!'));
    } else {
        callback();
    }
}
function validatePassword(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        var checkResult = passwordValid(value);
        if (checkResult != '') {
            callback(new Error(checkResult));
        } else {
            if (vue.loginForm.passwordCheck !== '') {
                vue.$refs.loginForm.validateField('passwordCheck');
            }
            callback();
        }
    }
}
function validatePasswordCheck(rule, value, callback) {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== vue.loginForm.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
}
function validateVerificationCode(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入验证码'));
    } else {
        callback();
    }
}
function passwordValid(psw) {
    var validResult = '';
    if (!passwordReg1.test(psw)) {
        validResult = '密码长度在6到18位之间。';
    } else if (passwordReg2.test(psw)) {
        validResult = '密码不能全是数字。';
    } else if (passwordReg3.test(psw)) {
        validResult = '密码不能全是字母。';
    } else if (!passwordReg4.test(psw)) {
        validResult = '允许含有的特殊字符';
    } else if (!passwordReg.test(psw)) {
        validResult = '密码必须由大小写字母数字组成';
    }
    return validResult;
}