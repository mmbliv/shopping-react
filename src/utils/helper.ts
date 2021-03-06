import { productsType } from "../context/products_context"
import {  singleProductCartType } from "../context/cart_context"
export const formatPrice=(number:number)=>{
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',

    }).format(number/100)
}
type keyType='category'|'colors'|'company'
export const getUniqueFilterItem=(data:productsType[],key:keyType)=>{
    let uniqueItem=data.map((item)=>item[key]) as string[]
    if(key==='colors'){
        uniqueItem=uniqueItem.flat()
    }

    return ['ALL',...new Set(uniqueItem)]

}
export const getTheMaxPrice=(data:productsType[])=>{
    let tempMax=0
    data.forEach((i)=>{
        if(i.price>tempMax){
            tempMax=i.price
        }
    }
    )
    return tempMax
}
// export const calculateTotalQuantity=(products:productsType[])=>{
//    return products.reduce((ack,product)=>ack+product.single_quantity!,0)
// }
// export const calculateTotalPrice=(products:productsType[])=>{
//     return products.reduce((ack,product)=>ack+product.single_total_price!,0 )

// }
export const findItemsAddedToCart=(products:singleProductCartType[],color:string,id:string)=>{
   let p=products.find(product=>product.id===id+color)
   if(p){
       return p.quantity
   }

}