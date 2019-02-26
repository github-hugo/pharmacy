function createJSPath(js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
        ;
    }
    ;
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    ;
    return path;
};

function getAppPath() {
    var utilPath = createJSPath("vue-common.js");
    return utilPath.replace("/main/common/", "");
};
var appPath = getAppPath();
var dateVer="?v=" + new Date().getTime();
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + appPath + "/main/scripts/element/elementui2.4.8/index.css\">");
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + appPath + "/main/scripts/vue/vue-style.css\">");
// document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + appPath + "/main/scripts/font-icon/iconfont.css\">");
// document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + appPath + "/main/scripts/font-icon-ali/iconfont.css\">");
document.write("<script src='" + appPath + "/main/scripts/jquery/jquery-3.3.1.min.js'><\/script>");
document.write("<script src='" + appPath + "/main/scripts/jquery/jquery.base64.js'><\/script>");
document.write("<script src='" + appPath + "/main/scripts/element/elementui2.4.3/vue.min.js'><\/script>");
document.write("<script src='" + appPath + "/main/scripts/element/elementui2.4.8/index.js'><\/script>");
document.write("<script src='" + appPath + "/main/scripts/moment/moment.min.js'><\/script>");
// document.write("<script src='" + appPath + "/main/common/bluebird.min.js'><\/script>");
// document.write("<script src='" + appPath + "/main/common/vue-util.js" + dateVer + "'><\/script>");
// document.write("<script src='" + appPath + "/main/common/constants.js" + dateVer + "'><\/script>");
// document.write("<script src='" + appPath + "/main/common/upload/upload.js'><\/script>");
document.write("<script src='" + appPath + "/main/scripts/layer-3.0.3/layer.js'><\/script>");
// document.write("<script src='" + appPath + "/main/common/vue-constants.js'><\/script>");
// document.write("<script src='" + appPath + "/main/js/statistics.js'><\/script>");
document.write("<script src='" + appPath + "/main/scripts/jquery/jquery.validity.js'><\/script>");


Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function fomatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

/**
 * 添加全局遮罩
 * @param obj
 * @returns {*}
 * @author guol
 * @since 20171123
 */
function loadingMaskMethod(obj, text) {
    var loading = obj.$loading({
        lock: true,
        text: text || '正在加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(240, 240, 247, 0.5)'
    });
    return loading;
}

/**
 * 添加全局遮罩-针对对接国家系统的操作
 * @param obj
 * @returns {*}
 * @author guo
 * @since 20180119
 */
function loadingCountrySysMaskMethod(obj) {
    var loading = obj.$loading({
        lock: true,
        text: '与国家系统对接中,请稍后!',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return loading;
}

/**
 * 从后端获取服务器当前时间
 * @returns {string}
 * @author guo
 * @since 20180907
 */
function getServerCurrentDate() {
    var currentTime;
    $.ajax({
        url: '/solidwaste/global/getServerCurrentDate',
        type: "POST",
        dataType: 'json',
        async:false,
        success: function (result) {
            //成功会返回服务器时间,失败,会从后端返回一个new Date()
            currentTime = result.obj;
        },
        error:function () {
            console.log("ajax请求失败!");
        }
    });
    return currentTime;
}
/**
 * 校验字符是否  是不超过6位的正整数
 * @param str
 * @returns {boolean}
 * @author guo
 * @since 20181205
 */
function isPositiveIntegerNotOverSix(str) {
    //是否为正整数
    if (str.length > 6) {
        return false;
    }
    var re = /^\+?[1-9][0-9]*$/;
    return re.test(str);
}

/**
 * 通过企业id 查询企业拓展表信息,获取企业行政区划
 * @param enterpriseId
 * @author guo
 * @since 20181031
 * @returns {*}
 */
 function getEnterpriseAreaCodeById(enterpriseId) {
    var areaCode;
    var requestData = {
        ticketId: this.ticketId,
        enterpriseId: enterpriseId
    }
    $.ajax({
        url: '/enterpriseExtended/getEnterpriseInfoById',
        dataType: 'json',
        type: 'post',
        data: requestData,
        async: false,
        success: function (result) {
            if (result.success) {
                if (result.obj != null) {
                    areaCode = result.obj.areaCode;
                } else {
                    areaCode = null;
                }

            }
        }
    })
    return areaCode;
}

/**
 * 用于生成uuid
 * @returns {string}
 * @constructor
 * @author guol
 * @since 20171129
 */
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function createUUID() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * 根据列表需要的状态进行转换
 * 全局：【s0 编辑 s1 有效 s2 无效】
 * @param s
 * @returns {string}
 */
function getIconCSS(s, type) {
    if(type == 'inventoryStatus'){
        switch (s) {
            case '0':
                return 's1';
            case '1':
                return 's3';
            default:
                return '';
        }
    }
    if (type == 'medicalTransfer') {
        switch (s) {
            case '2':
                return 's2';
            case '1':
                return 's1';
            default:
                return '';
        }
    }
    if (type == 'entAudit') {
        switch (s) {
            case 'UNCOMMITED':
                return 's0';
            case 'COMMITED':
                return 's3';
            case 'VERIFIED':
                return 's1';
            case 'RETURNED':
                return 's2';
            default:
                return '';
        }
    }
    if (type == 'transferPlan') {
        switch (s) {
            case 'edit':
                return 's0';
            case 'commit':
                return 's0';
            case 'recorded':
                return 's1';
            case 'recordback':
                return 's2';
            case 'EDIT':
                return 's0';
            case 'COMMIT':
                return 's0';
            case 'RECORDED':
                return 's1';
            case 'RECORDBACK':
                return 's2';
            case 'EFFECT':
                return 's3';
            case 'first_audit':
                return 's4';
            case 'second_audit':
                return 's5';
            case 'FIRST_AUDIT':
                return 's4';
            case 'SECOND_AUDIT':
                return 's5';
            default:
                return '';
        }
    }
    if (type == 'transferManifest') {
        switch (s) {
            case 'SIGNED':
                return 's1';
            case 'CANCEL':
                return 's2';
            case '9':
                return 's9';
            default:
                return '';
        }
    }
    if (type == 'specialTransfer') {
        switch (s) {
            case 'WAIT_CONFIRM':
                return 's0';
            case 'WAIT_OUT':
                return 's0';
            case 'WAIT_SIGN':
                return 's0';
            case 'WAIT_CONSULT':
                return 's3';
            case 'CONSULT_AGREE':
                return 's3';
            case 'SIGNED':
                return 's1';
            case 'CANCEL':
                return 's2';
            default:
                return '';
        }
    }
    if (type == 'wasteProduceDetail') {
        switch (s) {
            case '0':
                return 's0';
            case '2':
                return 's3';
            case '3':
                return 's1';
            case '4':
                return 's6';
            default:
                return '';
        }
    }
    if (type == 'bill') {
        switch (s) {
            case '0':
                return 's1';
            case '1':
                return 's2';
            case '2':
                return 's0';
            case '3':
                return 's3';
            case '4':
                return 's4';
            default:
                return '';
        }
    }
    if (type == 'managementPlan') {
        switch (s) {
            case 'INEDIT':
                return 's0';
            case 'WORKED':
                return 's1';
            case 'INRECORD':
                return 's3';
            case 'RECORDED':
                return 's9';
            case 'RETURNED':
                return 's8';
            case 'ONFILE':
                return 's7';
            case 'FIRSTAUDIT':
                return 's4';
            case 'SECONDAUDIT':
                return 's5';
            case 'THIRDAUDIT':
                return 's6';
            default:
                return '';
        }
    }
    if (type == 'storage') {
        switch (s) {
            case '0':
                return 's0'
            case '2':
                return 's3';
            case '3':
                return 's1';
            default:
                return '';
        }
    }
    if (type === 'xkzcx') {
        switch (s) {
            case '0':
                return 's7';
            case '1':
                return 's1';
            case '2':
                return 's2';
            case '3':
                return 's3';
            case '4':
                return 's8';
            case '8':
                return 's9';
            default:
                return '';
        }
    }
    if (type === 'listShHbj') {
        switch (s) {
            case '0':
                return 's9';
            case '1':
                return 's1';
            case '2':
                return 's2';
            default:
                return '';
        }
    }
    if (type === 'normSystem') {
        switch (s) {
            case 'EDITING':
                return 's7';
            case 'EFFECTIVE':
                return 's1';
            case 'HISTORY':
                return 's8';
            default:
                return '';
        }
    }
    if (type === 'collecting') {
        switch (s) {
            case '0':
                return 's1';
            case '1':
                return 's2';
            case '2':
                return 's3';
            case '3':
                return 's0';
            default:
                return '';
        }
    }
    if (type === 'drill') {
        switch (s) {
            case 'edit':
                return 's0';
            case 'effect':
                return 's1';
            case 'invalid':
                return 's2';
            default:
                return '';
        }
    }
    if (type === 'customsapply') {
        switch (s) {
            case 'edit':
                return 's0';
            case 'recorded':
                return 's1';
            case 'recordBack':
                return 's2';
            case 'recording':
                return 's3';
            default:
                return '';
        }
    }
    if (type === 'manifest') {
        switch (s) {
            case '1':
                return 's8';
            case '2':
                return 's9';
            case '3':
                return 's1';
            case '4':
                return 's3';
            case '5':
                return 's2';
            case 'a':
                return 's5';
            case 'c':
                return 's6';
            case 'd':
                return 's7';
            default:
                return '';
        }
    }
    if (type == 'iotEntProject') {
        switch (s) {
            case '1':
                return 's1';
            case '2':
                return 's0';
            case '3':
                return 's1';
            default:
                return '';
        }
    }
    if (type == 'iotEntMonitoring') {
        switch (s) {
            case '0':
                return 's1';
            case '1':
                return 's2';
            default:
                return '';
        }
    }
    if (type == 'weighbridgeMonitoring') {
        switch (s) {
            case '0':
                return 's2';
            case '1':
                return 's1';
            default:
                return '';
        }
    }
    if (type == 'medicalPlan') {
        switch (s) {
            case '0':
                return '';
            case '1':
                return 's8';
            case '2':
                return 's1';
            case '3':
                return 's2';
            case '4':
                return 's4';
            default:
                return '';
        }
    }

    if (type == 'monthlyStatistics') {
        switch (s) {
            case 'edit':
                return 's0';
            case 'commited':
                return 's5';
            case 'pass':
                return 's1';
            case 'reject':
                return 's2';
            default:
                return '';
        }
    }

    return 's' + s;
}

function getStatusIcon(s, type) {
    return "<i class='iconfont icon-status " + getIconCSS(s, type) + "'></i>"
}

var VUE_COMMON_CONFIG = {
    loading: false,
    width: {
        td_date: 100, // 日期
        td_datetime: 170, // 日期时间
        td_waste_code: 110, // 八位码
        td_operate_1: 66,
        td_operate_2: 110,
        td_status_storage: 66,
        td_type_waste: 110,
    },
    align: {
        th: 'center',
        td_fixed: 'center',
        td_number: 'right',
        td_operator: 'center',
    },
    size: {},
    type: {
        button_operator: 'text', // 列表操作列按钮
        button_search: 'primary', // 查询按钮
        button_main: 'primary', // 主要功能按钮
        button_seco: 'default', // 次要功能按钮, 如返回、取消等无关业务数据操作的按钮
    },
    option: {
        confirm: {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        },
    },
    tooltip: {
        overflow: true,
    },
    page: {
        current: 1,
        size: 10,
        sizes: [10, 50, 100],
        prevText: '上一页',
        nextText: '下一页',
    },
    title: {
        popover: '温馨提示',
    },
    shortcuts: [{
        text: '最近一周',
        onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick: function (picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }],
    regularVerifyPhone: {
        message: '请填入正确的号码！',
        pattern: /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1\d{10})$)/,
        trigger: 'blur'
    },
    regularVerifyIdCard:{
        message: '请填入正确的身份证号码！',
        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        trigger: 'blur'
},
        regularVerifyMailbox: {
            message: '请填入正确的邮箱地址！',
            pattern:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            trigger: 'blur',
}

}