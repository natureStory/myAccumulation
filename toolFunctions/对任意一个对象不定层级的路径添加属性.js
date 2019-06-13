
const obj = {
    "a": {
        "aa":
            {
                "aaa": {},
                "aab": {qq: 2}
            },
        "ab": {},
        "ac": {},
        "ad": "value"
    },
    "b": {},
    "c": {},
    "d": {}
};
const handle = (router, target, origionObj) => {
    const routersArr = [];
    router.split('.').slice(1).reduce((total, item) => { routersArr.push([...total, item]); return [...total, item]}, []);
    const result = routersArr.reverse().reduce((total, item, index, routersArr) => {
        if (!total) {
            return {
                ...item.reduce((total, item) => {
                    return total ? total[item] : origionObj[item];
                }, ''),
                ...target
            }
        } else {
            let tempResult = {
                ...item.reduce((total, item) => {
                    return total[item];
                }, origionObj)
            };
            tempResult[routersArr[index - 1].reverse()[0]] = total;
            return tempResult;
        }
    }, '');
    let newOrigionObj = {...origionObj};
    newOrigionObj[router.split('.').slice(1, 2)] = result;
    return newOrigionObj;
};
console.log(handle('obj.a.aa.aab', {pp: 222}, obj));
