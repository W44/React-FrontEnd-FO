import React, { useEffect, useState, useContext } from "react";
import { MenuSelect, URL } from "../../Constants";
import { ItemListContext } from "../Contexts/ItemListContext";
import PastListItems from "./PastListItems";
import AuthContext from "../Contexts/AuthContext";
import { SidebarContext } from "../Contexts/SidebarContext";

const PastItems = () => {

    const { token } = useContext(AuthContext);
    const menuCtx = useContext(SidebarContext);
    const ItemCtx = useContext(ItemListContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (menuCtx.Menu.MenuItem === MenuSelect.View_Past) {
            const fetchPreviousData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(URL + '/api/v1/order/past', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Server response caused an error');
                    }
                    const jsonData = await response.json();

                    ItemCtx.setCustomPastItemsRefreshed(jsonData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                finally {
                    setLoading(false);
                }
            };
            fetchPreviousData();
        }
    }, [menuCtx.Menu]);



    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    return (
        <>{ItemCtx?.pastItems?.length > 0 ? (
            ItemCtx.pastItems.map((item, index) => (
                <li key={index}>
                    <PastListItems
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        date={item.date}
                        username={item.username}
                        ocUser={item.ocUser}
                    />
                </li>
            ))
        ) : (
            <p className="text-gray-700">No items found.</p>
        )}</>
    );
}

export default PastItems;