/// <reference path="jquery-1.7.2.min.js" />
/*
Created date: 6/26/2012
Author: Banh Cao Quyen
version: 1.0
Description:------------------------------
*/

var prevKey = -1, prevControl = '';

if (typeof console == 'undefined') {
    console = {
        log: function () {
            //
        }
    }
}

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (typeof Array.prototype.reduce !== 'function') {
    Array.prototype.reduce = function (callback /*, initialValue*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var t = Object(this), len = t.length >>> 0, k = 0, value;
        if (arguments.length == 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in t)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
        }
        for (; k < len; k++) {
            if (k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    };
}

function LoadVideoPlayer() {
    $('div[rel=videook],tr[rel=videook]').each(function () {

        var videoid = $(this).attr('id');
        var width = $(this).width();
        var height = 360;
        if (width > 700)
            height = 419;

        videoid = videoid.replace('togglevideo_', 'mediaplayer_');

        var videourl = $(this).attr('videourl');

        jwplayer(videoid).setup({
            'flashplayer': '/jwplayer.swf',
            'id': 'playerID',
            'width': 'auto',
            'height': height,
            'file': 'http://www.youtube.com/embed/' + videourl,
            'controlbar.position': 'over',
            "controlbar.idlehide": true,
            "controlbar.dock": true,
            'logo.file': 'https://file4.batdongsan.com.vn/images/logo-web.png'
        });

        $(videoid + "_wrapper").css("margin", "auto");
    });
}

function setActiveClass(tag, interval) {

    if (tag.hasClass('lv0') || tag.hasClass('lv1') || tag.hasClass('lv2') || tag.hasClass('lv3') || tag.hasClass('lv4')) {

        tag.addClass('active');
        tag.addClass('hover');

        if (tag.hasClass('lv0')) {
            return;
        }
    }
    interval++;
    if (interval < 10) {
        setActiveClass(tag.parent(), interval);
    } else {
        //c/onsole.log(tag);
        //c/onsole.log('over: ' + interval);
    }
}

function doSelectAll(chkId, gridId) {
    //get reference of GridView control
    var grid = document.getElementById(gridId);
    //variable to contain the cell of the grid
    var cell;
    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {
            //get the reference of first column
            cell = grid.rows[i].cells[0];

            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {
                //if childNode type is CheckBox                 
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    cell.childNodes[j].checked = document.getElementById(chkId).checked;
                }
            }
        }
    }
}

var counter = 0;

function doSelectItem(objSelectItem, selectAllId, gridId) {
    if (objSelectItem.checked == false && $('#' + selectAllId).attr('checked') == "checked") {
        $('#' + selectAllId).attr('checked', false);
    }

    if (checkSelectAll(gridId)) {
        $('#' + selectAllId).attr('checked', true);
    }
}

function checkSelectAll(gridId) {
    var ret = true;
    var grid = document.getElementById(gridId);
    //variable to contain the cell of the grid
    var cell;
    if (grid.rows.length > 0) {
        //loop starts from 1. rows[0] points to the header.
        for (i = 1; i < grid.rows.length; i++) {
            //get the reference of first column
            cell = grid.rows[i].cells[0];
            //loop according to the number of childNodes in the cell
            for (j = 0; j < cell.childNodes.length; j++) {
                //if childNode type is CheckBox                 
                if (cell.childNodes[j].type == "checkbox") {
                    //assign the status of the Select All checkbox to the cell checkbox within the grid
                    if (cell.childNodes[j].checked == false)
                        ret = false;
                }
            }
        }
    }
    return ret;
}
//================Error display==================================
function appendErrorContent(elementToCheck, errorMessage) {
    var errContent = '<label class="error">' + errorMessage + '</label>';
    $(elementToCheck).next().remove();
    $(elementToCheck).after(errContent);
    $(elementToCheck).css('border-color', 'red');
}

function resetErrorContent(elementToCheck) {
    $(elementToCheck).next().remove();
    $(elementToCheck).css('border-color', '#A0A0A0');
}

//================== Check All By Hoangnnh============================
function checkAllClick(sender, lstContainerClass) {
    var checkedVal = $(sender).attr("checked");
    if (checkedVal == undefined) {
        checkedVal = false;
    }

    $(sender).parents("." + lstContainerClass).find(".checkByCheckAll > input").attr("checked", checkedVal);
}

function childrenCheckChange(sender, lstContainerClass) {
    var lstCheckBox = $(sender).parents('.' + lstContainerClass).find(".checkByCheckAll");
    var countCheck = 0;
    for (var i = 0; i < $(lstCheckBox).length; i++) {
        if ($(lstCheckBox[i]).children('input').attr("checked") == "checked") {
            countCheck++;
        }
    }
    if (countCheck == lstCheckBox.length) {
        $(sender).parents("." + lstContainerClass).find('#CkCheckAll').attr('checked', true);
    } else {
        $(sender).parents("." + lstContainerClass).find('#CkCheckAll').attr('checked', false);
    }
}

function highLightRowClick(sender) {
    var items = $('.highlight');
    for (var i = 0; i < items.length; i++) {
        $(items).removeClass('highlight');
    }
    $(sender).parent("td").parent("tr").addClass('highlight');
}

function RequestQueryString(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function loadOddAndeEvenClass(classTable) {
    //$(".table-style").children("tbody").children("tr:odd").addClass("itemsOdd");
    $(classTable).children("tbody").children("tr:even:not(:first)").addClass("act");

}
//---------------------HoangTV------------------------//
//Binding data to ddl control 
function LoadControl(list, controlId, valueField, textField, defaultText, selectedvalue) {
    //Load default item
    if (defaultText != null) {
        $(controlId).empty().append('<option selected="selected" value="0">' + defaultText + '</option>');
    }

    if (list.length > 0) {
        $.each(list, function () {
            $(controlId).append($("<option " + (selectedvalue == this[valueField] ? "selected='selected'" : "") + "></option>").val(this[valueField]).html(this[textField]));
        });
    }
}

function numbersonly(myfield, e, dec) {
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;

    //console.log(e);

    if ((key == 86) && (e.ctrlKey == true) || (key == 67) && (e.ctrlKey == true)) {
        return true;
    }

    if (key >= 96 && key <= 105)
        key = key - 48;

    keychar = String.fromCharCode(key);

    // control keys
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 27) || key == 16 || key == 35 || key == 36 || key == 46 || (key >= 48 && key <= 57) || key == 37 || key == 39) {
        return true;
    }

    if (key == 13) {
        if ($(myfield).attr('id') == "txtBetMoney") {
            BetlogInsert();
        }
        return false;
    }
        // numbers
    else if ((("0123456789").indexOf(keychar) > -1))
        return true;

        // decimal point jump
    else if (dec && (key == 190 || key == 110)) {
        return $(myfield).val().indexOf('.') < 0;
    }
    else
        return false;
}

/**
* check_phone()
* hàm kiểm tra số điện thoại
* 
* @param string str : chuỗi kiểm tra
* @return
*/
function check_phone(str) {
    if (!/01*[0-9]{9}/.test(str) || !/09*[0-9]{8}/.test(str)) {
        return false;
    }

    return true;
}

function isPhoneNumberWithoutCountryCode(value, isOnly10) {

    var pattern = /^\d{10,11}$/;

    if (pattern.test(value)) {

        for (var i = 0; i < lstHeaderMobile10.length; i++) {
            var header = lstHeaderMobile10[i];
            if (value.indexOf('0' + header) == 0 && value.length == 10)
                return true;
        }

        //if (isOnly10 == undefined || isOnly10 == false) {
            for (var i = 0; i < lstHeaderMobile11.length; i++) {
                var header = lstHeaderMobile11[i];
                if (value.indexOf('0' + header) == 0 && value.length == 11)
                    return true;
            }
        //}
    }

    return false;
}

var lstHeaderMobile10 = [99, 92, 90, 93, 89, 91, 94, 88, 96, 97, 98, 86, 52, 81, 82, 83, 84, 85, 32, 33, 34, 35, 36, 37, 38, 39, 70, 76, 77, 78, 79, 56, 58, 59];
var lstHeaderMobile11 = [199, 188, 186, 120, 121, 122, 126, 128, 123, 124, 125, 127, 129, 162, 163, 164, 165, 166, 167, 168, 169]

/**
* check_string()
* hàm kiểm tra chuỗi str, ký tự của str chỉ thuộc str_valid và không thuộc str_invalid
* ứng dụng: dùng để kiểm tra chuỗi số, chuỗi đặc biệt
* 
* @param string str   : chuỗi kiểm tra
* @param string str_valid  : chuỗi bắt buộc phải có
* @param string str_invalid : chuỗi không được phép có
* @return
*/
function check_string(str, str_valid, str_invalid) {
    if (!str) {
        return false;
    }

    var n = str.length;

    // kiểm tra các ký tự chỉ có thể thuộc str_valid
    if (str_valid) {
        var i = 0;
        while (i < n) {
            if (str_valid.indexOf(str.charAt(i)) == -1) {
                return false;
            }

            i++;
        }
    }

    // kiểm tra các ký tự không được thuộc str_invalid
    if (str_invalid) {
        var i = 0;
        while (i < n) {
            if (str_invalid.indexOf(str.charAt(i)) != -1) {
                return false;
            }

            i++;
        }
    }

    return true;
}

function refreshCaptcha(imgId) {
    $('#' + imgId).attr('src', '/CaptchaGenerator.aspx?t=' + new Date().getMilliseconds());
}

function refreshNewCaptcha(imgId) {
    $('#' + imgId).attr('src', '/HandlerWeb/Captcha.ashx?t=' + (new Date()).getTime());
}

function refreshPublicCaptcha(imgId, hddId) {

    $.ajax({
        type: 'POST',
        url: '/HandlerWeb/Captcha.ashx?type=base64&t=' + (new Date()).getTime(),
        success: function (data, textStatus, response) {
            $('#' + hddId).val(response.getResponseHeader('Etag'));
            $('#' + imgId).attr('src', "data:image/jpeg;base64," + data);
        },
        error: function (request, textStatus, errorThrown) {

        }
    });

}

function VNDateTimeToUTCDateTime(vnDatetime, separatorChar) {
    try {
        var strDate = vnDatetime.toString();
        var aDate = strDate.split(separatorChar);
        var retDate = new Date(aDate[2] + '/' + aDate[1] + '/' + aDate[0]).toDateString();
        return retDate;
    } catch (ex) {
        //c/onsole.log(vnDatetime);
        //c/onsole.log(ex);
        return new Date();
    }
}

function UTCDateTimeToVNDateTime(utcDatetime, separator) {
    var strdate = '';
    try {
        strdate = new Date(utcDatetime);
    } catch (ex) {
        //c/onsole.log(ex);
        strdate = new Date();
    }
    var day = strdate.getDate() < 9 ? '0' + (strdate.getDate()) : strdate.getDate();
    var month = strdate.getMonth() < 9 ? "0" + (strdate.getMonth() + 1) : (strdate.getMonth() + 1);
    var retDate = day + separator + month + separator + strdate.getFullYear();
    return retDate;
}

//------------------End HoangTV-----------------------//

function wordCount(str) {
    if (str == null || str.length == 0)
        return 0;
    while (str.indexOf('  ') >= 0) {
        str = str.replace('  ', ' ');
    }
    if (str.length == 0)
        return 0;
    var count = 1;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == ' ') {
            count++;
        }
    }
    return count;
}
//-------------Set homepage action ----------------//\

function setHomepageIE() {
    if (document.all) {
        var home = "https://batdongsan.com.vn/";
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(home);
    }
}

function setHomepage() {
    var id = "set-home";
    var link = "/nhung-cau-hoi-thuong-gap/#";
    var lang = window.navigator.language;
    var ua = navigator.userAgent.toLowerCase();
    var check = function (r) {
        return r.test(ua);
    };
    var isOpera = check(/opera/);
    var isChrome = check(/chrome/);
    var isWebKit = check(/webkit/);
    var isSafari = !isChrome && check(/safari/);
    var isIe = !isOpera && check(/msie/);
    var isFF = !isWebKit && check(/gecko/);
    if (isIe) {
        setHomepageIE();
    } else {
        if (isFF) {
            link += "firefox";
        }
        else if (isChrome) {
            link += "chrome";
        }
        else if (isSafari) {
            link += "safari";
        }
        else if (isOpera) {
            link += "opera";
        }
        window.location.href = link;
    }

}

function GetTotalDay(day1, day2) {
    var sec = day2 - day1;
    sec = sec / 24;
    sec = sec / 60;
    sec = sec / 60;
    sec = sec / 1000;
    return sec;
}

function GetMoneyText(money) {

    if (money <= 0) {
        return "0 đồng";
    }

    money = Math.round(money * 10) / 10;
    var retval = '';
    var sodu = 0;
    if (money >= 1000000000) {
        sodu = Math.floor(money / 1000000000);
        retval += sodu + ' tỷ ';
        money = money - (sodu * 1000000000);
    }
    if (money >= 1000000) {
        sodu = Math.floor(money / 1000000);
        retval += sodu + ' triệu ';
        money = money - (sodu * 1000000);
    }
    if (money >= 1000) {
        sodu = Math.floor(money / 1000);
        retval += sodu + ' nghìn ';
        money = money - (sodu * 1000);
    }

    money = Math.floor(money);

    if (money > 0) {
        retval += money + ' đồng';
    }

    return retval.trim();
}

function GetMoneyText2(money) {
    money = Math.round(money * 10) / 10;

    var retval = '';
    var sodu = 0;
    if (money >= 1000000000) {
        sodu = money / 1000000000;
        return sodu + ' tỷ ';
    }
    if (money >= 1000000) {
        sodu = money / 1000000;
        return sodu + ' triệu ';
    }
    return GetMoneyText(money);
}

function togglevideo(id) {

    if ($("#togglevideo_" + id).css("display") == "none") {

        $('div[rel=videook],tr[rel=videook]').each(function () {
            var videoid = $(this).attr('id');
            $("#" + videoid).css('display', 'none');
            videoid = videoid.replace('togglevideo_', 'mediaplayer_');
            $("#" + videoid).html('');

        });

        var video_id = $('#togglevideo_' + id).attr('videourl').split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }

        $("#togglevideo_" + id).css("display", "");
        $("#mediaplayer_" + id).html('<iframe width="745" height="419" src="https://www.youtube.com/embed/' + video_id + '?rel=0&amp;showinfo=0?ecver=1" frameborder="0" allowfullscreen></iframe>');

    } else {
        $("#togglevideo_" + id).css("display", "none");
        $("#mediaplayer_" + id).html('');
    }

    $('#mediaplayer_' + id + "_wrapper").css("margin", "0px auto");

    /*
    //        $("#togglevideo_" + id).slideToggle(0);
    if ($("#togglevideo_" + id).css("display") == "none") {

        $('div[rel=videook],tr[rel=videook]').each(function () {
            var videoid = $(this).attr('id');

            videoid = videoid.replace('togglevideo_', 'mediaplayer_');

            jwplayer(videoid).stop();

        });

        $("#togglevideo_" + id).css("display", "");
        jwplayer("mediaplayer_" + id).play();

    } else {
        $("#togglevideo_" + id).css("display", "none");
        jwplayer("mediaplayer_" + id).stop();
    }

    $('#mediaplayer_' + id + "_wrapper").css("margin", "0px auto");
    */
};

function Trim(str) {

    if (str == undefined)
        return '';

    var mk = str;

    while (mk.indexOf('\n') >= 0) {
        mk = mk.replace('\n', ' ');
    }

    while (mk.indexOf('\t') >= 0) {
        mk = mk.replace('\t', ' ');
    }

    while (mk.length > 0 && mk.indexOf(' ') == 0) {
        mk = mk.substring(1, mk.length);
    }

    while (mk.length > 0 && mk.lastIndexOf(' ') == mk.length - 1) {
        mk = mk.substring(0, mk.length - 1);
    }

    while (mk.indexOf('&nbsp;') >= 0) {
        mk = mk.replace('&nbsp;', '');
    }

    return mk;
}

String.prototype.Trim = function () {
    return Trim(this);
};

function stripHTML(s) {
    var lastString, tmp;

    do {
        lastString = s;
        s = $('<div>').html(s).text();
    } while (lastString !== s)

    return s;
};

Date.prototype.format = function (format) //author: meizz
{
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

String.prototype.format = function () {
    var formatted = this;
    for (arg in arguments) {
        while (formatted.indexOf('{' + arg + '}') >= 0) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
    }
    return formatted;
};

function clearInput(obj) {
    $(obj).val('');
}

var uniChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆĐÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴÂĂĐÔƠƯ1234567890~!@#$%^&*()_+=-{}][|\":;'\\/.,<>? \n\r\t";

var KoDauChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZaaaaaaaaaaaaaaaaaeeeeeeeeeeediiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAAEEEEEEEEEEEDIIIOOOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYAADOOU1234567890~!@#$%^&*()_+=-{}][|\":;'\\/.,<>? \n\r\t";

var uniCharsAlfabe = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆĐÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴÂĂĐÔƠƯ1234567890 ";

var KoDauCharsAlfabe = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZaaaaaaaaaaaaaaaaaeeeeeeeeeeediiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAAEEEEEEEEEEEDIIIOOOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYAADOOU1234567890 ";

var Alphabe = "qwertyuioplkjhgfdsazxcvbnm0123456789QWERTYUIOPASDFGHJKLZXCVBNM";

function UnicodeToKoDau(s, forSuggest) {
    var retVal = '';
    if (s == null)
        return retVal;
    var pos;
    var c = 'a';
    for (var i = 0; i < s.length; i++) {
        if (c == ' ' && s[i] == ' ')
            continue;

        c = s[i];

        if (forSuggest === undefined) {
            pos = uniChars.indexOf(c);

            if (pos >= 0)
                retVal += KoDauChars[pos];
        } else {
            pos = uniCharsAlfabe.indexOf(c);

            if (pos >= 0)
                retVal += KoDauCharsAlfabe[pos];
        }
    }

    return retVal;
}

function UnicodeToKoDauUrl(s) {
    var retval = '';
    if (s != null && s != '') {
        var reg_replace_white_space = new RegExp('( )+', "g");
        s = s.replace(reg_replace_white_space, '-');

        if (s.length > 100)
            s = s.substring(0, 100);

        s = UnicodeToKoDau(s);

        var reg_replace_html_tag = new RegExp('<[^>]*>');

        s = s.replace(reg_replace_html_tag, '');

        var ss = '';
        for (var i = 0; i < s.length; i++) {
            if (Alphabe.indexOf(s[i]) >= 0)
                ss += s[i];
            else
                ss += '-';
        }

        ss = ss.replace(reg_replace_white_space, '-');
        retval = ss;

        var reg_replace_urlchar = new RegExp('-+');

        retval = retval.replace(reg_replace_urlchar, '-');

        return retval.length > 100 ? retval.substring(0, 100) : retval;
    }
    return retval;
}

jQuery.fn.extend({
    scrollToMe: function () {
        var x = jQuery(this).offset().top;
        jQuery('html,body').animate({ scrollTop: x }, 400);

    }
});

// ThanhDT khai báo url map api
var mapHostUrl = "https://apimap.batdongsan.com.vn";
//var mapHostUrl = "http://172.16.0.5:8099";

// Get from query hash
String.prototype.getQueryHash = function (name, defaultVal) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\#&$]" + name + "=([^&#]*)"),
        results = regex.exec(this);
    return results == null ? (defaultVal == undefined ? "" : defaultVal) : decodeURIComponent(results[1].replace(/\+/g, " "));
};

// Get method for ajax (Fix in IE6,IE7,IE8,IE9) - For map utility request
function getAjaxMethod() {
    var m;
    if ($.browser != undefined && $.browser.msie) {
        if (parseInt($.browser.version) < 10) {
            m = "GET";
        } else {
            m = "POST";
        }
    } else {
        m = "POST";
    }

    return m;
}

$(window).scroll(function () {
    if ($(window).scrollTop() >= 200) {
        $('#to_top').fadeIn();
    } else {
        $('#to_top').fadeOut();
    }
});

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

// KienCT Validate Question Create
function CreateQuestionValidate() {
    if ($("#hddcboQuestionCategory").val() == undefined || $("#hddcboQuestionCategory").val() == -1) {
        $("#spanQuestion").show();
        return false;
    } else {
        $("#spanQuestion").hide();
    }
    return true;
}

$.fn.dropdownQuestion = function (data, oldValue, datawidth) {
    var html = '';
    var optionhtml = '';
    var id = $(this).attr('id');
    var newValue = -1;
    var newText = '';
    optionhtml = "<li rel='-1'>-- Choose question category --</li>";
    $.each(data, function (index, value) {
        if (value.Id == oldValue) {
            optionhtml += ' <li class="selected" rel="' + value.Id + '">' + value.Text + '</li>';
            newValue = value.Id;
            newText = value.Text;
        }
        else
            optionhtml += ' <li rel="' + value.Id + '">' + value.Text + '</li>';
    });
    if (newValue == -1) {
        newText = "-- Choose question category --";
    }
    html += ' <div class="drop-section" style="width:' + datawidth + ';" ><span class="drop-segtext">' + newText + '</span><span class="segdart"></span></div>';
    html += ' <div class="drop-gridcontainer" style="min-width:' + datawidth + '; display:none;" > ';
    html += ' <ul style="min-width:' + datawidth + '"> ';
    html += optionhtml;
    html += ' </ul> ';
    $("#" + id).html(html);
    $("#hdd" + id).val(newValue);
    $('#' + id + ' .drop-gridcontainer li').removeClass('selected');
    $('#' + id + ' .drop-gridcontainer li[rel="' + newValue + '"]').addClass('selected');
    $('#' + id + ' .drop-section').click(function () {
        if ($(this).hasClass('sectionactive')) {
            finish();
        } else {
            $(this).addClass('sectionactive');
            $('#' + id + ' .drop-gridcontainer').show();
        }
    });

    $('#' + id + ' .drop-gridcontainer li').click(function () {
        var text = $(this).html();
        var value = $(this).attr('rel');
        $('#' + id + ' .drop-gridcontainer li').removeClass('selected');
        $(this).addClass('selected');
        finish(text, value);
    });

    $(document).mouseup(function (e) {
        var container = $("#" + id + ' .drop-gridcontainer');
        var container1 = $("#" + id + ' .drop-section');
        if (!container.is(e.target)
            && container.has(e.target).length === 0 && !container1.is(e.target) && container1.has(e.target).length === 0) {
            finish();
        }
    });

    function finish(text, value) {
        if (text != null && text != '') $('#' + id + ' .drop-segtext').html(text);
        if (value != null && value != '') {
            $('#' + id).change();
            $("#hdd" + id).val(value);
        }
        $('#' + id + ' .drop-gridcontainer').hide();
        $('#' + id + ' .drop-section').removeClass('sectionactive');
    }
};

function LoadCategoryQuestion() {
    if ($("#cboQuestionCategory").length > 0) {
        var likeReturn;
        if ($("body").data('LoadCategoryQuestion') != null) {
            likeReturn = $("body").data('LoadCategoryQuestion');
            $("#cboQuestionCategory").dropdownQuestion(likeReturn, $("#hddcboQuestionCategory").val(), "400px");
        } else {
            $.ajax({
                type: "POST",
                cache: false,
                url: "https://content.batdongsan.com.vn/HandlerWeb/EnglishSearchHandler.ashx?module=GetCategotyQuestion",
                success: function (html) {
                    if (html.length > 0) {
                        likeReturn = $.parseJSON(html);
                        $("body").data('LoadCategoryQuestion', likeReturn);
                    }
                },
                timeout: 5000,
                complete: function () {
                    if (likeReturn != null) {
                        $("#cboQuestionCategory").dropdownQuestion(likeReturn, $("#hddcboQuestionCategory").val(), "400px");
                    }
                }
            });
        }
    }
}

$.fn.international = function () {
    var id = $(this).attr('id');
    $('#' + id + ' .gridcontainer li').removeClass('selected');
    $('#' + id + ' .section').click(function () {
        if ($(this).hasClass('sectionactive')) {
            $('#' + id + ' .gridcontainer').hide();
            $('#' + id + ' .section').removeClass('sectionactive');
        } else {
            $(this).addClass('sectionactive');
            $('#' + id + ' .gridcontainer').show();
        }
    });
    $('#' + id + ' .gridcontainer li').click(function () {
        var href = $(this).children("a");
        window.open(href.attr("href"));
    });
    $(document).mouseup(function (e) {
        var container = $("#" + id + ' .gridcontainer');
        var container1 = $("#" + id + ' .section');
        if (!container.is(e.target)
            && container.has(e.target).length === 0 && !container1.is(e.target) && container1.has(e.target).length === 0) {
            $('#' + id + ' .gridcontainer').hide();
            $('#' + id + ' .section').removeClass('sectionactive');
        }
    });
};

function PropertyHome(index) {
    if (index == 1) {
        $("#PropertyHomeSale").show();
        $("#PropertyHomeRent").hide();
        $("#Forsale").addClass("foractive");
        $("#Forrent").removeClass("foractive");
    } else if (index == 2) {
        $("#PropertyHomeSale").hide();
        $("#PropertyHomeRent").show();
        $("#Forsale").removeClass("foractive");
        $("#Forrent").addClass("foractive");
    }
}

function formatCurrency(sender, e) {

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;

    if (key == 35 || key == 36 || key == 37 || key == 38 || key == 39 || key == 40 || key == 46)
        return true;

    // store current positions in variables
    var start = sender.selectionStart;
    var end = sender.selectionEnd;

    var num = $(sender).val();
    var indent = Math.max(0, num.substring(0, start).split(',').length - 1);

    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = '0';

    var sign = num != Math.abs(num);
    num = Math.abs(num);

    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = '0' + cents;

    for (i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }

    indent = Math.max(0, Math.max(0, num.substring(0, start).split(',').length - 1) - indent);

    //writelog('indent: ' + indent);

    //writelog(start + ' ' + end + ' ' + num.length);

    // do your stuff
    $(sender).val((sign ? '-' : '') + num);

    // restore from variables...
    sender.setSelectionRange(start + indent, end + indent);

    //$(sender).val(num);
}

/*notify system*/
function ShowQuickViewNotify(btn) {

    try {
        ga('send', 'event', 'Xem thông báo', 'click', 'Xem danh sách thông báo nhanh');
    } catch (ex) {
        //
    }

    if ($('#notify_quick_view').length > 0) {

        $('#notify_quick_view').appendTo($('.header-top'));

    } else {
        var html = '<ul id="notify_quick_view" class="nqv">';
        html += '</ul>';

        $('.header-top').append(html);
    }

    $('#notify_quick_view').children().remove();
    $('#notify_quick_view').append('<li class="nqv"><div class="nitem nqv"><div class="nct nqv">Đang xử lý</div><div class="ncmd nqv"></div><div class="ncd nqv"></div></div></li>');

    $('#notify_quick_view').show();

    $.post('/HandlerWeb/NotifyHelperHandler.ashx', { action: 'getquickview' }, function (data) {

        if (data != null && data.data != null && data.data.length > 0) {

            $('#notify_quick_view').children().remove();

            for (var i = 0; i < data.data.length; i++) {
                var item = data.data[i];

                var html = '<li class="nqv">';
                html += '<div class="nitem nqv">';
                html += '<div class="nct nqv" onclick="ShowNotifyDetailFromQuickView(\'' + item.Id + '\', this, \'' + (item.NotifyType ? 1 : 0) + '\', ' + item.isSystem + ')">';
                html += item.Title;
                html += '</div>';
                html += '<div class="ncontent nqv" style="display:none;" rel="content">';
                html += item.Content;
                html += '</div>';
                html += '<div class="ncmd nqv"><img onclick="HideNotifyFromQuickView(\'' + item.Id + '\', \'' + (item.NotifyType ? 1 : 0) + '\', this, ' + item.isSystem + ')" class="nqv" src="https://file4.batdongsan.com.vn/images/Notify/quick-view-delete.png" /></div>';
                html += '<div class="ncd nqv">' + item.CreateDate + '</div>';
                html += '</div>';
                html += '</li>';

                $('#notify_quick_view').append(html);
            }

            $('.mnu-notify-icon-unread').html(data.total);

            $('#notify_quick_view').append('<li class="nqv"><a href="/trang-ca-nhan/uspg-notify" class="nmore nqv">Xem tất cả</a></li>');

        } else {
            $('#notify_quick_view').hide();
        }
    }, 'json');

    $('body').bind('click', $('#notify_quick_view'), function (_evt) {

        if ($(_evt.target).hasClass('nqv')) {
            if ($(_evt.target).hasClass('nmore') == false) {
                _evt.preventDefault();
                _evt.stopPropagation();
            }
        }
        else {
            _evt.data.remove();
            $('body').unbind('click');
        }
    });
}

function ShowNotifyDetailFromQuickView(cid, obj, notifyType, isSystem) {

    try {
        ga('send', 'event', 'Xem thông báo', 'click', 'Xem chi tiết thông báo nhanh');
    } catch (ex) {
        //
    }

    ShowNotifyDetail(cid, obj);

    HideNotifyFromQuickView(cid, notifyType, $(obj).next('div.ncmd').children('img'), isSystem);
}

function ShowNotifyDetail(cid, obj) {
    if ($('#backdrop_notify').length == 0)
        $('body').append('<div class="lg-backdrop in" id="backdrop_notify" style="transition-duration: 150ms;" onclick="$(\'#backdrop_notify\').remove(); $(\'#notify_popup\').remove();$(\'form\').removeClass(\'under-login-popup\');"></div>');

    if ($('#notify_popup').length == 0) {
        $('body').append('<div class="notifyPopupContainer"><div class="notifyPopup" id="notify_popup"><div class="notifyPopupClose fa fa-close" onclick="$(\'#backdrop_notify\').remove(); $(\'#notify_popup\').remove();$(\'body\').css(\'overflow\', \'auto\');$(\'form\').removeClass(\'under-login-popup\');"></div><div><div class="notifyPopupTitle"></div><div class="notifyPopupContent"></div></div></div></div>');
    }

    $('#notify_popup div div.notifyPopupTitle').html('<img src="https://file4.batdongsan.com.vn/images/Notify/img-notify-bell.png" align="center"/>' + $(obj).text());
    $('#notify_popup div div.notifyPopupContent').html($(obj).next('div[rel=content]').html());
    $('form').addClass('under-login-popup');
    //$('body').css('overflow', 'hidden');
}

function HideNotifyFromQuickView(notifyId, notifyType, obj, isSystem) {
    $.post('/HandlerWeb/NotifyHelperHandler.ashx', { action: 'turnoffnew', notifyType: notifyType, id: notifyId, isSystem: isSystem }, function (data) {
        $(obj).parent().parent().remove();

        DecreaseNotifyUnreadCount();
    });
}

function DecreaseNotifyUnreadCount() {
    var count = $('.mnu-notify-icon-unread').html();
    if (isFinite(count) && parseInt(count) > 1) {
        $('.mnu-notify-icon-unread').html(parseInt(count) - 1);
    } else {
        $('.header-middle-righ-icon.nqv').hide();
    }
}

function writelog(obj) {
    if (console) {
        console.log(Object);
    }
}

function writeScript(scriptUrl, funOnload) {
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore((function () {
        var sc = document.createElement('script');
        sc.type = 'text/javascript';
        sc.src = scriptUrl;
        sc.async = true;
        sc.defer = true;
        if (funOnload !== undefined) {
            sc.onload = funOnload;
        } else {
            sc.onload = function () {
                sc.parentNode.removeChild(sc);
            };
        }
        return sc;
    })(), s);
}

$.fn.flipCompare = function () {
    this.each(function () {
        var _this = $(this);
        var width = _this.attr("data-width");
        var height = _this.attr("data-height");
        _this.css("border", "none");
        _this.addClass("flip-compare");

        _this.find("img").each(function () {
            var img = $(this);
            if (img.index() > 1) img.hide();
            if (img.index() == 0) img.wrap("<div class='front'></div>");
            if (img.index() == 1) img.wrap("<div class='back'></div>");
            img.css("width", width);
            img.css("height", height);
        });
        //_this.find('img:first').wrap("<div class='front'></div>");
        //_this.find('img:last').wrap("<div class='back'></div>");
        $('.front,.back').append("<div class='note_flip'>Click để lật ảnh</div>");

        _this.flip({
            trigger: 'click'
        });
    });
};

$.fn.sliderCompare = function () {
    this.each(function () {
        var _this = $(this);
        var width = _this.attr("data-width");
        var height = _this.attr("data-height");
        var dimension = _this.attr("data-dimension");
        var offset = _this.attr("data-offset");
        if (isNaN(offset) || offset > 1 || offset < 0) offset = 0.5;
        if (dimension != "vertical" && dimension != "horizontal") {
            dimension = 'horizontal';
        }

        _this.css("border", "none");
        _this.find("img").each(function () {
            var img = $(this);
            if (img.index() > 1) img.hide();
            img.css("width", width);
            img.css("height", height);
        });

        _this.addClass("twentytwenty-container").twentytwenty({ default_offset_pct: offset, orientation: dimension, move_slider_on_hover: true, move_with_handle_only: true, click_to_move: false });
    });
};

$(document).ready(function () {

    try {
        $('.date-picker').datepicker({
            dateFormat: "dd/mm/yy",
            yearRange: "-90:+0",
            changeMonth: true,
            changeYear: true
        });

    } catch (ex) {
        //c/onsole.log(ex);
    }

    if ($("#emailregister").length > 0) {
        $("#emailregister").fancybox({
            'width': 600,
            'height': 850,
            'maxWidth': 600,
            'minHeight': 850,
            'autoScale': true,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'scrolling': 'no'
        });
    }

    $(window).bind('load', function () {

        if (window.location.href.indexOf('Operator.aspx') < 0) {
            $('img').each(function () {
                if ($(this).attr('bannerid') == undefined && $(this).attr('noloaderror') == undefined) {
                    if ((typeof this.naturalWidth != "undefined" && this.naturalWidth == 0) || this.readyState == 'uninitialized') {
                        $(this).attr('src', 'https://file4.batdongsan.com.vn/images/no-photo.jpg');
                    }
                }
            });
        }
    });

    $('.dropdown-navigative-menu').find('li.lv1').mouseover(function () {

        //c/onsole.log($(this).offset().left + 220 + 220 > $(document.body).width());

        if ($(this).offset().left + 220 + 220 > $(document.body).width()) {
            $(this).find('ul').each(function () {
                $(this).css('left', '-' + $(this).width() + 'px');
            });
        } else {
            var _w = $(this).width() + 20;
            $(this).find('ul').each(function () {
                $(this).css('left', _w + 'px');
            });
        }
    });

    $('a#facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href + '&t=' + window.document.title);
    $('a#twitter').attr('href', 'https://twitter.com/intent/tweet?original_referer=' + window.location.href + '&text=' + window.document.title.replace("|", "+") + '&tw_p=tweetbutton&url=' + window.location.href + '&via=your_screen_name');
    $('a#google').attr('href', 'https://plus.google.com/share?url=' + window.location.href);
    $('a#googleBookmark').attr('href', 'https://plus.google.com/share?url=' + window.location.href);
    $('a#delicious').attr('href', "http://del.icio.us/post?url=" + window.location.href + "&title=" + window.document.title);
    $('a#digg').attr('href', "http://digg.com/submit?phase=2&url=" + window.location.href + "&title=" + window.document.title);
    //$('#twitter').attr('href', "http://twitter.com/home?status=" + window.location.href + " - " + window.document.title);
    //$('a#yahoo').attr('href', "http://buzz.yahoo.com/buzz?targetUrl=" + window.location.href + "&headline=" + window.document.title);

    $('#page-navigative-menu a[href="#"]').css('cursor', 'default');

    if ($(".customeScrollbar").length > 0) {
        $(".customeScrollbar").mCustomScrollbar({
            scrollInertia: 150
        });
    }

    //LoadVideoPlayer();

    var href = window.location.pathname;

    // Check truong hop dac biet la Mo gioi ca nhan va Mo gioi doanh nghiep
    if (href.indexOf("-eb") > 0 || href.indexOf("-ep") > 0) {
        var urlcate = 'nha-moi-gioi';
        if (href.indexOf("-ep") > 0)
            urlcate = 'doanh-nghiep';

        var taga = $('.dropdown-navigative-menu,#dropdown-menu').find('a[href=\'/' + urlcate + '\']');
        if (taga.length > 0) {
            setActiveClass(taga, 0);
        }
    } else {

        var a_return = new Array();
        var _dom = $(".dropdown-navigative-menu li a");
        href_ = href.split("/");

        var string_search = new Array();
        for (var i = 0; i < _dom.length; i++) {
            var abc = _dom[i].toString().split("/");
            if (abc.length > 3) {
                string_search.push(abc[3]); //lay danh sach cate tu menu
            }
        }

        if (href_.length >= 2) {
            var xyz = href_[1];
            for (var i = 0; i < string_search.length; i++) {
                var b_ = xyz.search(string_search[i]); //Duyet chuoi danh sach cate de so sanh voi URL
                if (b_ != -1) {
                    a_return.push(string_search[i]); //Neu la tap con cua URL thi add vao array 
                }
            }
        }

        var return_data = "";
        var return_index = 0;

        for (var x = 0; x < a_return.length; x++) {
            if (a_return[x].length > return_index) {//so sanh do dai lon nhat trung` voi URL thi lay gia tri
                return_index = a_return[x].length;
                return_data = a_return[x]; //gia tri can lay (duy nhat 1 gia tri)
            }
        }

        var taga = $('.dropdown-navigative-menu,#dropdown-menu').find('a[href=\'/' + return_data + '\']');

        if (taga.length > 0) {
            setActiveClass(taga, 0);
        }

    }

    // Load dropdownlist question category Q&A
    LoadCategoryQuestion();
    // Select option International
    $("#cboInternational").international();
    // Property Tab
    PropertyHome(1);

    //    }

    $('#to_top').fadeOut();
    $("#to_top").click(
        function () {
            $("body,html").animate({ scrollTop: 0 }, "normal"); $("#page").animate({ scrollTop: 0 }, "normal"); return false;
        });

    $(".order").keydown(function (event) {
        if (!(event.keyCode == 8                                // backspace
            || event.keyCode == 9                               // tab
            || event.keyCode == 17                              // ctrl
            || event.keyCode == 46                              // delete
            || (event.keyCode >= 35 && event.keyCode <= 40)     // arrow keys/home/end
            || (event.keyCode >= 48 && event.keyCode <= 57)     // numbers on keyboard
            || (event.keyCode >= 96 && event.keyCode <= 105)    // number on keypad
            || (event.keyCode == 65 && prevKey == 17 && prevControl == event.currentTarget.id))          // ctrl + a, on same control
        ) {
            event.preventDefault();     // Prevent character input
        }
        else {
            prevKey = event.keyCode;
            prevControl = event.currentTarget.id;
        }
    });

});
