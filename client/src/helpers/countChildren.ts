export const countChildren  = (root:Element, set:Set<Element> = new Set(),count = 0) => {
    set.add(root);
    if(root.children.length) {
       let children = root.children;
       for(let i = 0; i < children.length; i++) {
          countChildren(children[i], set,count + 1);
       }
    }
    if(!count) {
        return set;
    }
}