import React from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArchiveIcon from '@mui/icons-material/Archive';
export let links: {
    id: number,
    text: string,
    url: string
}[];
links = [
    {
        id: 1,
        text: 'home',
        url: '/'
    },
    {
        id: 2,
        text: 'about',
        url: 'about'
    },
    {
        id: 3,
        text: 'products',
        url: '/products'
    }
]
export let service: {
    id: number,
    icon: any,
    title: string,
    text: string
}[] = [
        {
            id: 1,
            icon: <AccessAlarmIcon />,
            title: 'mission',
            text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
        },
        {
            id: 2,
            icon: <AddTaskIcon />,
            title: 'vision',
            text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
        },
        {
            id: 3,
            icon: <ArchiveIcon />,
            title: 'history',
            text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
        }

    ]

export const products_url = 'https://course-api.com/react-store-products'

export const single_product_url = `https://course-api.com/react-store-single-product?id=`


