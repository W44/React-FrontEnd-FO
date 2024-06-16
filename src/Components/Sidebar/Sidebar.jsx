import React from 'react'
import { ButtonStyle1 } from '../../Constants';

export default function Sidebar()
{

    return (
        <aside className='w-1/4 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
            <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-200'>Menu</h2>
            <div>
                <button className={ButtonStyle1}>+ New Order</button>
            </div>
            <div>
                <button className={ButtonStyle1}>View Current Orders</button>
            </div>
            <div>
                <button className={ButtonStyle1}>View Past Orders</button>
            </div>
        </aside>
    );
}