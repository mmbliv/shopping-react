import React from 'react'
import { initialStateType } from '../context/products_context'
import { productsType } from '../context/products_context'
import { singleProductType } from '../context/products_context'


export enum ActionKind{
    GET_PRODUCTS_BEGIN='GET_PRODUCTS_BEGIN',
    GET_PRODUCTS_SUCCESS='GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_ERROR='GET_PRODUCTS_ERROR',
    GET_SINGLE_PRODUCT_BEGIN='GET_SINGLE_PRODUCT_BEGIN',
    GET_SINGLE_PRODUCT_SUCCESS='GET_SINGLE_PRODUCT_SUCCESS',
    GET_SINGLE_PRODUCT_ERROR='GET_SINGLE_PRODUCT_ERROR',
    FILTER_PRODUCT='FILTER_PRODUCT'
}
 type ActionType={
     type:ActionKind;
     payload?:productsType[] | singleProductType;
 }

const products_reducer = (state:initialStateType,action:ActionType):initialStateType => {
    if(action.type===ActionKind.GET_PRODUCTS_BEGIN){
        return {...state,products_loading:true}
    }
    if(action.type===ActionKind.GET_PRODUCTS_SUCCESS){
        const payload=action.payload as productsType[]
        const featured_products=payload!.filter((item)=>
            item.featured===true     
        )
        return {...state,products_loading:false,products:payload!,featured_products}

    }
    if(action.type===ActionKind.GET_PRODUCTS_ERROR){
        return {...state,products_error:true,products_loading:false}

    }
    if(action.type===ActionKind.GET_SINGLE_PRODUCT_BEGIN){
        return {...state,single_product_loading:true,single_product_error:false}
    }
    if(action.type===ActionKind.GET_SINGLE_PRODUCT_ERROR){
        return {...state,single_product_error:true}
    }
    if(action.type===ActionKind.GET_SINGLE_PRODUCT_SUCCESS){
        const payload=action.payload as singleProductType
        const imgUrls=[]
        for(let img of payload.images){
            imgUrls.push(img.url)
        }
        return {...state,single_product_loading:false,single_product:{...payload,imgUrls:imgUrls}}
    }
    
    return state
}

export default products_reducer
