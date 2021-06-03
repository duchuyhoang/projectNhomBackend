exports.roomListFilter = {
    ward: (value, ward) => {
        return value.ward == ward
    },
    district: (value, district) => {
        return value.district == district;
    },
    city: (value, city) => {
        return value.city == city
    },
    name: (value, name) => {
        return value.name.indexOf(name) !== -1;
    },
    min_price: (value, price) => {
        return value.price >= price;
    },
    max_price: (value, price) => {
        return value.price <= price
    },
    utilities: (value, listUtilitiesId) => {
        var pass = true;
        for (let index = 0; index < listUtilitiesId.length; index++) {
            var temporatoryPass = false;

            for(let i=0;i<value.utilities.length;i++){
                if (value.utilities[i].utilitiesIds == listUtilitiesId[index]) {
                    temporatoryPass = true;
                    break;
                }
            }
            
            if (!temporatoryPass) {
                pass = false;
                break;
            }

        }
        return pass;
    }
}
