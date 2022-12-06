// Параметры:
// obj -объект с классами импортированый из модуля classes.module.s?css
// block - название блока-класса
// element - element данного блока.
// modifires - массив модификаторов соответсвенно модификатора или блока.
/* Режимы работы функции:
* 1. Вызов getClassesWithModifires(obj, block)
* - добавит классы со всеми модификаторами которые есть в объекте к блоку, если одинаковые по имени,
* ,(например size_1, size_2, size_3),то первый которые следует в файле(например size_1).
*  продолжение следует....
* */
export function getClassesWithModifires(
     obj:{[key:string]:string },
     block:string = "",
     element:string = "",
     modifires:string[] = [],
     exclude:string[] = []) {
    if(!block && !element) {
        return "";
    }
    let addedModifires:string[] = [];
    let modifires_groups:({[p: string]: string} | null)[];
    let exlude_groups:({[p: string]: string} | null)[];
    if(modifires.length) {
        modifires_groups = modifires.map(getModifireNameAndValue);
    }
    if(exclude.length) {
        exlude_groups = exclude.map(getModifireNameAndValue);
    }
    let name_element = [block,element].reduce((accum,el,index,arr) =>
    ((!index && arr[index] && arr[index+1])? accum += el + "__" : accum += el, accum),"");
    let regExp = createRegExp(name_element);
    let keys = Object.keys(obj);
    let filtredkeys = keys.filter((key) => {
        let result = false;
        if((result = regExp.test(key))) {
            let groups = key.match(regExp)?.groups;
            if (groups) {
                let { modifire, modifire_name, modifire_value } = groups;
                if(modifire) {
                    if(exclude.length) {
                        let exclude_group = findNeedGroup(exlude_groups,modifire_name);
                        if(exclude_group) {
                            return  false;
                        }
                    }
                    if(!modifires.length) {
                        result = isAddedModifires(addedModifires, modifire_name);
                    }
                    if(modifires.length) {
                        let modifires_group = findNeedGroup(modifires_groups,modifire_name);
                        if (modifires_group) {
                            result = modifires_group?.modifire_value === modifire_value;
                        } else {
                            result = isAddedModifires(addedModifires, modifire_name);
                       }
                    }
                }
            }
        }
        return result;
    });
    return filtredkeys.map((key) => obj[key]).join(" ");
 }
 function findNeedGroup(arrForFind:({[p: string]: string} | null)[],modifire_name:string) {
    return  arrForFind.find((obj_match) => {
         return obj_match?.modifire_name === modifire_name;
   });
 }
function isAddedModifires(addedModifires:string[],modifire_name:string):boolean {
    if(!addedModifires.includes(modifire_name)) {
        addedModifires.push(modifire_name);
        return  true;
    } else {
        return false;
    }
}
function getModifireNameAndValue(modifire:string):({[p: string]: string } | null) {
 let regExp = new RegExp(
`^(?<modifire_name>[a-z]+(-[a-z]+)?)(?<modifire_value>_[a-z\\d]+(-[a-z\\d]+)?)?$`,
 "i"
 );
 let groups = modifire.match(regExp)?.groups;
 return  groups ? groups : null;
}
function createRegExp(data:string):RegExp {
let regexp = new RegExp(
`^${data}(?<modifire>_(?<modifire_name>[a-z]+(-[a-z]+)?)(?<modifire_value>_[a-z\\d]+(-[a-z\\d]+)?)?)?$`,
 "i"
);
return regexp;
}

