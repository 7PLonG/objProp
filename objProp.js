/**
 * hasProp[目标对象是否含有某属性]
 * @param  {[Object]} oriobj [目标对象]
 * @param  {[String || Array]} checkprop [含参 'a.b.c.d'||['a','b','c','d']]
 * @param  {[any not undefined]} val [赋值]  如有设置，则循环到最后一项成功时会将其赋值,辅助传值，建议再setProp中使用
 * @return {[Boolean]}  []
 */
function hasProp(oriobj, checkprop, val) {
    let params = [0];
    if (typeof checkprop === 'string') {
        params = checkprop.split('.');
    } else if (Array.isArray(checkprop)) {
        // 递归使用
        params = checkprop;
    } else {
        console.error('入参格式错误');
    }
    if (params.length === 0) {
        console.error('入参为空数组，按false返回');
        return false;
    }
    if (oriobj === undefined) {
        console.error('比较对象空了');
    }
    const prop = params[0];
    if (params.length === 1) {
        if (val !== undefined) {  // 分割出set
            oriobj[prop] = val;
        }
        return oriobj.hasOwnProperty(prop);
    }
    if (!oriobj.hasOwnProperty(prop)) {
        return false;
    }
    params.shift();
    return  hasProp(oriobj[prop], params);
}
/**
 * hasProp[目标对象的某属性赋值]
 * @param  {[Object]} oriobj [目标对象]
 * @param  {[String || Array]} checkprop [含参 'a.b.c.d'||['a','b','c','d']]
 * @param  {[any not undefined]} val [赋值]  如有设置，则循环到最后一项成功时会将其赋值
 * @param {[Boolean]}  isforce 如传入ture会强制赋值不考虑目标之前有无此层级
 * @return {[Boolean]}  []
 */

function setProp(oriobj, checkprop, val, isforce = false) {
    if (!isforce) {
        return hasProp(oriobj, checkprop, val);
    }
        let params = [0];
        let _obj = oriobj;
        if (typeof checkprop === 'string') {
            params = checkprop.split('.');
        } else if (Array.isArray(checkprop)) {
            params = checkprop;
        } else {
            console.error('入参格式错误');
            return false;
        }
        params.forEach((el, i) => {
            try {
                if (el !== undefined);
            } catch (err) {
                console.error('入参格式错误' + err);
                return false;
            }
            if (hasProp(_obj, el)) {
                _obj[el] = val;
                return true;
            }
                if (i === params.length - 1) {
                    _obj[el] = val;
                } else {
                    _obj = _obj[el];
                    return true;
                }
        });
}

function getProp(oriobj, checkprop) {
    let params = [0];
    if (typeof checkprop === 'string') {
        params = checkprop.split('.');
    } else if (Array.isArray(checkprop)) {
        // 递归使用
        params = checkprop;
    } else {
        console.error('入参格式错误');
    }
    if (params.length === 0) {
        console.error('入参为空数组，按false返回');
        return false;
    }
    if (oriobj === undefined) {
        console.error('比较对象空了');
    }
    const prop = params[0];
    if (params.length === 1) {
        return oriobj[prop];
    }
    if (!oriobj.hasOwnProperty(prop)) {
        return undefined;
    }
    params.shift();
    return  getProp(oriobj[prop], params);
}
export {
    hasProp, setProp, getProp
};
