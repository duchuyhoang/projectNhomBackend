const staticConst = require("../common/staticConst")
exports.createObjectWithKeys = (keys, value) => {
    let data = {};
    keys.forEach((key, _) => {
        data[key] = value[key] || value[`"${key}"`] || null;
    })
    return data;
}

exports.forBulkInsert = (dataList, insertedId) => {
    // imageList will be [[1,2,3],[1,4,5],[1,6,7]]
    // do this for bulk insert after
    let multidimensionArrayData = [];
    dataList.forEach((data, _) => {
        // imgData is id and link
        let oneArrayData = [insertedId];
        for (let key in data) {
            oneArrayData.push(data[key])
        }
        multidimensionArrayData.push(oneArrayData)
        // imageList will be [[1,2,3],[1,4,5],[1,6,7]]
        // do this for bulk insert after 
    })

    return multidimensionArrayData;
}

// keyList1 , keyList2 and newKeyList need to be same length
exports.normalizeObjectByKeyPair = (keyList1, keyList2, newKeyList, value) => {
    var keyPairObject = {};
    var normalizedValue = { ...value };
    var listValueByKey = [];
    keyList1.forEach((key1, index) => {
        // reset it everytime loop
        keyPairObject = {};
        listValueByKey = [];
        // For default
        keyPairObject[key1] = null;
        keyPairObject[keyList2[index]] = null;


        // Delete object property we dont need it anymore 
        delete normalizedValue[key1];
        delete normalizedValue[keyList2[index]];

        if (value[key1] && value[keyList2[index]]) {
            // keyPairObject[key1] = value[key1].split(staticConst.concatSeparator)
            // keyPairObject[keyList2[index]] = value[keyList2[index]].split(staticConst.concatSeparator);

            const listValue1 = value[key1].split(staticConst.concatSeparator);
            const listValue2 = value[keyList2[index]].split(staticConst.concatSeparator);
            // listValueByKey

            listValue1.forEach((v, i) => {
                keyPairObject[key1]=v;
                keyPairObject[keyList2[index]]=listValue2[i];
                listValueByKey.push({...keyPairObject})
            })


        }

        normalizedValue[newKeyList[index]] = listValueByKey
    })
    return normalizedValue;
}


            // imageInfoList.forEach((img, _) => {
            //     // imgData is id and link
            //     let imgData = [insertId];
            //     for (let key in img) {
            //         imgData.push(img[key])
            //     }
            //     imageList.push(imgData)
            //     // imageList will be [[1,2,3],[1,4,5],[1,6,7]]
            //     // do this for bulk insert after 
            // })
        // }