exports.createObjectWithKeys=(keys,value)=>{
    let data={};
    keys.forEach((key, _) => {
        data[key] = value[key] || value[`"${key}"`] ||null;
    })
    return data;
}

exports.forBulkInsert=(dataList,insertedId)=>{
     // imageList will be [[1,2,3],[1,4,5],[1,6,7]]
     // do this for bulk insert after
    let multidimensionArrayData=[];
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