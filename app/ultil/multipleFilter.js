class MulitipleFilter {

    constructor(listFilter, value,specialSplit) {
        // listFilter is object with key and value filter func
        this.listFilter = listFilter;
        // listValue to filter
        // begining value   
        this.value = value;
        this.listFilterFunc = [];
        this.specialSplit=specialSplit;
    }

    filterAll(listKeyAndValueToFilter) {
        var filteredValue = this.value;
        // list filter by the key
        Object.keys(listKeyAndValueToFilter).forEach((key, _) => {
            if (this.listFilter[key] !== undefined && listKeyAndValueToFilter[key]) {
                this.listFilterFunc.push({
                    params:listKeyAndValueToFilter[key].indexOf(this.specialSplit)==1
                    ? listKeyAndValueToFilter[key].split(this.specialSplit)
                     : [listKeyAndValueToFilter[key]],
                    func: this.listFilter[key]
                });
            }
        })


        this.listFilterFunc.forEach((filterFunc, _) => {
            filteredValue = filteredValue.filter((v) => {
                // console.log("param",v.district);
                return filterFunc.func(v,filterFunc.params) });
        })

        return filteredValue;

    }

}
module.exports = MulitipleFilter