export function getMapping(obj1, obj2) {
    return Object.entries(obj1).reduce((prod, [k, v]) => {
        for(const [kk, vv] of Object.entries(obj2)) {
            if(v === vv) {
                if(Object.hasOwn(prod, k))
                    prod[k].push(kk)
                else
                    prod[k] = [kk]
            }
        }
        return prod
    }, {})
}
