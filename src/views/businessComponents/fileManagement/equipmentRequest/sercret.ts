let _crysuff = 'decrypt/api/'; // 访问路径前缀
// 对ajax配置整体修改加密

function alertcrypturl  (url, mycrinfo) { // 修改加密地址
    // 修改url，到加密拦截地址
    if (!mycrinfo) {
        if (_cryinfo && _cryinfo.decryptType){
            mycrinfo = Object.assign(_cryinfo);
        } else {
            mycrinfo = {
                decryptType: _decryptType, // 加密方式
                decryptpublictekey: _decryptpublictekey, // aes 为密钥， rsa为公钥
                decryptprivatekey: _decryptprivatekey // aes 为密钥偏移量 ， rsa为私钥
            }
        }
    }
    let path = url;
    let searparam = "";
    let index =  url.indexOf('?');
    if (index >= 0) {
        path = url.substr(0, index);
        searparam = url.substr(index);
        let ps = searparam.split('&');
        let crparams = '';
        if (ps && ps.length > 0) {
            for (let p of ps) {
                let parms = p.split('=');
                crparams = crparams + '&' + parms[0] + '=';
                if (parms && parms.length > 0) {
                    if (parms[1]) {
                        if ('ticket' !== parms[1]) {
                            crparams = crparams + myencodeparam(""+parms[1], mycrinfo);
                        } else {
                            crparams = crparams + parms[1];a
                        }
                    }
                }
            }
            crparams = crparams.substr(1)
        }
        searparam = crparams;
    }
    let index2 = path.indexOf(_javabasepath);
    if (index2 >=0 ) {
        return  _javabasepath + _crysuff + path.substr(index2 + _javabasepath.length) + searparam;
    } else {
        index2 = path.indexOf(_flowadminpath);
        if (index2 >=0 ) {
            return  _flowadminpath + _crysuff + path.substr(index2 + _flowadminpath.length) + searparam;
        } else {
        return path + searparam;
        }
    }
}
function myencodeajaxopton  (ajaxoption) {
    if (ajaxoption && ajaxoption.url) {
        if (typeof(ajaxoption.url) == "object") {
            var urlobj = ajaxoption.url;
            if (urlobj.url && typeof(urlobj.url) == 'string') {
                ajaxoption.url = urlobj.url
                ajaxoption.data = Object.assign(ajaxoption.data || {}, urlobj.params || {});
                if (typeof(urlobj.success) == 'function') {
                    ajaxoption.success = urlobj.success;
                }
                if (!urlobj.type) {
                    urlobj.type = "POST";
                }
                ajaxoption.type = ajaxoption.type || urlobj.type
               /* if (!urlobj.dataType) {
                    urlobj.dataType = "json";
                }
                ajaxoption.type = ajaxoption.dataType || urlobj.dataType*/
                ajaxoption.xhrFields = {
                    withCredentials: true
                };
                if (typtsso) {
                    ajaxoption.headers = {}
                } else {
                    ajaxoption.headers = {
                        '_at': _ticket
                    }
                }
            }
        }
    }
    var mycrinfo = null;
    if (ajaxoption.url.indexOf('/regedit/reginloginSuccess') >= 0) {
        mycrinfo = {
            decryptType: _decryptType, // 加密方式
            decryptpublictekey: _decryptpublictekey, // aes 为密钥， rsa为公钥
            decryptprivatekey: _decryptprivatekey // aes 为密钥偏移量 ， rsa为私钥
        }
    } else {
    if (_cryinfo && _cryinfo.decryptType) {
            mycrinfo = Object.assign(_cryinfo);
        } else {
            mycrinfo = {
                decryptType: _decryptType, // 加密方式
                decryptpublictekey: _decryptpublictekey, // aes 为密钥， rsa为公钥
                decryptprivatekey: _decryptprivatekey // aes 为密钥偏移量 ， rsa为私钥
            }
        }
    }
    if (mycrinfo && mycrinfo.decryptType) {
        let iscry = false; // 需要加密
        let iscry2 = false; // 本地java地址
        let index2 = ajaxoption.url.indexOf(_javabasepath);
        if (index2 >= 0) {
            iscry2 = true;
        } else {
            index2 = ajaxoption.url.indexOf(_flowadminpath);
        }
        if (index2 >= 0) {
            iscry2 = true;
        }
        if (iscry2) {
            // 修改参数
            if (ajaxoption.contentType && ajaxoption.contentType.toLocaleString().indexOf('multipart/form-data') >= 0) { // 多媒体
                iscry = false;
            } else if (ajaxoption.contentType && ajaxoption.contentType.toLocaleString().indexOf('application/json') >= 0) { // body格式
                if (typeof (ajaxoption.data) === 'string') {
                    ajaxoption.data = myencodeparam(ajaxoption.data, mycrinfo);
                } else if (ajaxoption.data) {
                    ajaxoption.data = myencodeparam(JSON.stringify(ajaxoption.data, mycrinfo));
                }
                iscry = true;
            } else if (ajaxoption.contentType && ajaxoption.contentType.toLocaleString().indexOf('text/html') >= 0) { // body格式
                if (typeof (ajaxoption.data) === 'string') {
                    ajaxoption.data = myencodeparam(ajaxoption.data, mycrinfo);
                } else if (ajaxoption.data) {
                    ajaxoption.data = myencodeparam(JSON.stringify(ajaxoption.data), mycrinfo);
                }
                iscry = true;
            } else {
                ajaxoption.data = {
                    _decryptParam: myencodeparam(JSON.stringify(ajaxoption.data), mycrinfo)
                };
                iscry = true;
            }
            if (iscry) {
                ajaxoption.url = alertcrypturl(ajaxoption.url, mycrinfo);
                if (ajaxoption.success) {
                    let oldsuccess = ajaxoption.success;
                    ajaxoption.success = function (data) {
                        let rs = null;
                        let mojson = true; // 需要多一次json转换
                        if (typeof (data) === 'string') {
                        try{// 后台有时是字符，有的是对象，是字符时，会将加密变成json串类型的字符 需要现jsoan化
                            data = JSON.parse(data);
                                mojson = false;
                        }catch(e){
                            }
                        }
                        if (data && data.success) {
                            if (data.decryptObject) {
                                let type = data.type;
                                rs = mydecodeparam(data.decryptObject, mycrinfo);
                                if (mojson) { // 多一次转换，就是后台直接传递一个对象
                                    try{// 后台有时是字符，有的是对象，是字符时，会将加密变成json串类型的字符 需要现jsoan化
                                rs = JSON.parse(rs);
                                    }catch(e){
                                    }
                                }
                                if (type === 'text') {
                                } else {
                                try{// 后台有时是字符，有的是对象，是字符时，会将加密变成json串类型的字符 需要现jsoan化
                                    rs = JSON.parse(rs);
                                }catch(e){
                                    }
                                }
                            }
                        } else {
                            if (data && data.decryptObject) {
                                rs = data.decryptObject;
                            }
                        }
                        if (typeof (oldsuccess) === 'function') {
                        oldsuccess(rs);
                        }
                    }
                }
                if (ajaxoption.error) {
                    let olderror = ajaxoption.error;
                    ajaxoption.error = function (data) {
                        var reson = data;
                        if (typeof (data) === 'object') {
                            var restext = data.responseText;
                            if (restext && typeof (restext) === 'string') {
                                try{
                                   var resdata = JSON.parse(restext);
                                    if (resdata && resdata.success) {
                                        if (resdata.decryptObject) {
                                            reson = mydecodeparam(resdata.decryptObject, mycrinfo);
                                        }
                                    } else {
                                        if (resdata && resdata.decryptObject) {
                                            reson = resdata.decryptObject;
                                        }
                                    }
                                }catch(e){
                                }
                            }
                        }
                        if (typeof (olderror) === 'function') {
                            if (typeof(reson) === 'string') {
                                try{
                                    olderror(JSON.parse(reson));
                                }catch(e){
                                    olderror(reson);
                                }
                            } else {
                                olderror(reson);
                           }
                        }
                    }
                }
            }
        }
    }
    return ajaxoption;
}

/**
 * 对单个参数加密
 * @param param
 */
myencodeparam = function (param, mycrinfo) {
    if (!mycrinfo) {
    if (_cryinfo && _cryinfo.decryptType) {
            mycrinfo = Object.assign(_cryinfo);
        } else {
            mycrinfo = {
                decryptType: _decryptType, // 加密方式
                decryptpublictekey: _decryptpublictekey, // aes 为密钥， rsa为公钥
                decryptprivatekey: _decryptprivatekey // aes 为密钥偏移量 ， rsa为私钥
            }
        }
    }
        let res = null;
    if ('rsa' === mycrinfo.decryptType.toLocaleString()) {
        res = myencodeparamrsa(param, mycrinfo);
        } else {
        res = myencodeparamaes(param, mycrinfo);
        }
        if (res){
            return Base64.encode(res);
        }
        return res;
}


/**
 * 对单个参数加密，rsa
 * @param param
 */
myencodeparamrsa = function (param, mycrinfo) {
    if (mycrinfo && mycrinfo.decryptType
        && mycrinfo.decryptpublictekey && mycrinfo.decryptprivatekey && param) {
        let pw2 =  sm2.doEncrypt(param, mycrinfo.decryptpublictekey, 0);
         return Base64.encode('04' + pw2);
    }
    return param;
}

/**
 * 对单个参数加密 aes
 * @param param
 */
myencodeparamaes = function (param, mycrinfo) {
    if (mycrinfo && mycrinfo.decryptType
        && mycrinfo.decryptpublictekey && param) {
        const key = asmCrypto.string_to_bytes(mycrinfo.decryptpublictekey,true);
        const nonce = createArrayRound(12);
        const adata = undefined;
        const tagsize = 16;
        let cryarr = asmCrypto.AES_GCM.encrypt(asmCrypto.string_to_bytes(param, true), key, nonce, adata, 16);
        let tmp = new Uint8Array(cryarr.length + 12);
        tmp.set(nonce);
        tmp.set(cryarr, nonce.length);
        return asmCrypto.bytes_to_base64(tmp);
    }
    return param;
}

/**
 * 对单个参数解密
 * @param param
 */
mydecodeparam = function (param, mycrinfo) {
    if (!mycrinfo) {
    if (_cryinfo && _cryinfo.decryptType) {
            mycrinfo = Object.assign(_cryinfo);
        } else {
            mycrinfo = {
                decryptType: _decryptType, // 加密方式
                decryptpublictekey: _decryptpublictekey, // aes 为密钥， rsa为公钥
                decryptprivatekey: _decryptprivatekey // aes 为密钥偏移量 ， rsa为私钥
            }
        }
    }
    if ('rsa' === mycrinfo.decryptType.toLocaleString()) {
        try{
            return mydecodeparamrsa(param, mycrinfo);
        }catch(e){
        }
        } else {
        try{
            return mydecodeparamaes(param, mycrinfo);
        }catch(e){
        }
    }
    return param;
}

/**
 * 对单个参数解密
 * @param param
 */
mydecodeparamaes = function (param, mycrinfo) {
    if (mycrinfo && mycrinfo.decryptType
        && mycrinfo.decryptpublictekey && mycrinfo.decryptprivatekey && param) {
        const key = asmCrypto.string_to_bytes(mycrinfo.decryptpublictekey,true);
        const adata = undefined;
        const tagsize = 16;
        const cleartext = asmCrypto.base64_to_bytes(param);
        let nonce = new Uint8Array(12);
        nonce.set(cleartext.subarray(0,12));
        let cry = new Uint8Array(cleartext.byteLength - 12);
        cry.set(cleartext.subarray(12));
        return asmCrypto.bytes_to_string(asmCrypto.AES_GCM.decrypt(cry, key, nonce, adata,16), true);
    }
    return param;
}

/**
 * 对单个参数解密
 * @param param
 */
mydecodeparamrsa = function (param, mycrinfo) {
    if (mycrinfo && mycrinfo.decryptType
        && mycrinfo.decryptpublictekey && mycrinfo.decryptprivatekey && param) {
        return sm2.doDecrypt(Base64.decode(param).substr(2), mycrinfo.decryptprivatekey, 0)
    }
    return param;
}

$crypAjax = function (option) {
    option.type = "POST";
    if (_needcrypAjax) {

    let _this = this;
        if (_loadjsok) {
            $.ajax(myencodeajaxopton(option));
        } else {
            setTimeout(function () {
                _this.$crypAjax(option);
            })
        }
    } else {
        $.ajax(option);
  }
}
// extjs 解密 嵌入到extjs- ext-all-dev中
_myextjsdecryptofunction = function (response, url) {
    if (_needcrypAjax) {
    if (url.indexOf(_javabasepath) >= 0) {
        if (response.responseText) {
            var data = JSON.parse(response.responseText);
            if (data && data.success) {
                if (data.decryptObject) {
                    let type = data.type;
                    var rs = mydecodeparam(data.decryptObject);
                    if (type === 'text') {
    } else {
                        try{// 后台有时是字符，有的是对象，是字符时，会将加密变成json串类型的字符 需要现jsoan化
                            rs = JSON.parse(rs);
                        }catch(e){
                        }
                    }
                    response.responseText = rs;
                } else {
                    response.responseText = ""
                }
            } else {
                if (data && data.decryptObject) {
                    response.responseText = data.decryptObject;
                } else {
                    response.responseText = "";
                }
            }
        }
    }
    return response;
    } else {
        return response;
    }
}

// extjs 加密extjs- ext-all-dev中
_myextjsencryptofunction = function (params, url) {
    if (_needcrypAjax) {
    if (!params) {
        return params;
    }
    if (url.indexOf(_javabasepath) >= 0) {
        if (typeof(params) === 'string') {
            return "_decryptParam=" + myencodeparam(params)
        } else {
            return "_decryptParam=" + myencodeparam(Ext.encode(params))
        }
    } else {
        return params;
    }
    } else {
        return params;
    }
}

// extjs 中修改url到拦截url 中
function _myextjsencryptourl = function (url) {
    if (_needcrypAjax) {
    if (url.indexOf(_javabasepath) >= 0) {
        return alertcrypturl(url);
    } else {
        return url;
    }
    } else {
        return url;
    }
}

function createArrayRound (len) {
    if (!len) {
        len = 12
    }
    let arr = []
    for (let i = 0; i < len; i++) {
        arr.push(Math.round(Math.random() * 127))
    }
    return arr
}


