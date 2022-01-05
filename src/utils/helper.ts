import { productsType } from "../context/products_context"
export const formatPrice=(number:number)=>{
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',

    }).format(number/100)
}
type keyType='category'|'colors'|'company'
export const getUniqueFilterItem=(data:productsType[],key:keyType)=>{
    let uniqueItem=data.map((item)=>item[key])
    if(key==='colors'){
        uniqueItem=uniqueItem.flat()
    }

    return ['ALL',...new Set(uniqueItem)]

}
