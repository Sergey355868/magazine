export const __classes = <T>(...arg:T[]):string  => {
    return  arg.filter((_class) => _class && typeof _class === "string").join(" ");
}
export const getClassesByNumber = (obj:{[key:string]: string},element:string ,array:string[]):string => {
    let keys = Object.keys(obj);
    let finded_element = keys.find((key) => key.endsWith(element));
    if(finded_element) {
        let classes = obj[finded_element]
        let finded_classes = keys.map((key) => {
            let _class = "";
            for(let key_end of array) {
                if(key_end && key.endsWith(key_end) && key.includes(finded_element as string)) {
                    _class = obj[key];
                    break;
                }
            }
            return _class;
        }).filter(Boolean).join(" ");
       return classes + " " + finded_classes;
    } else {
        return  "";
    }

}
