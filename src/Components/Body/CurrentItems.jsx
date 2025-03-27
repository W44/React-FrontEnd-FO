import React, { useEffect, useState, useContext } from "react";
import { MenuSelect, URL } from "../../Constants";
import AuthContext from "../Contexts/AuthContext";
import { ItemListContext } from "../Contexts/ItemListContext";
import { SidebarContext } from "../Contexts/SidebarContext";
import "./BodyStyles.css"
import ListItems from "./ListItems";

const CurrentItems = () => {

    const authContext = useContext(AuthContext);
    const menuCtx = useContext(SidebarContext);
    const ItemCtx = useContext(ItemListContext);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        if (menuCtx.Menu.MenuItem === MenuSelect.View_Current) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(URL + '/api/v1/order/active', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authContext.token}`
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Server response caused an error');
                    }
                    const jsonData = await response.json();

                    ItemCtx.setCustomItemsRefreshed(jsonData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                finally {
                    setLoading(false);
                }
            }
            fetchData();
        };
    }, [menuCtx.Menu]);

    function SearchInputHandler(value) {
        setSearchInput(value);
    }
    const filteredItems = ItemCtx.Items.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()));

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }


    return (<>
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search items..."
                value={searchInput}
                onChange={(e) => SearchInputHandler(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center placeholder-gray-500"
            />
        </div>

        <ul>
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    <li key={item.id}>
                        <ListItems
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            date={item.date}
                            username={item.username}
                            disableEdit={item.userId !== authContext.userId}
                        />
                    </li>
                ))
            ) : (
                <p className="text-gray-700">No items found.</p>
            )}
        </ul>

    </>
    );

}

export default CurrentItems;