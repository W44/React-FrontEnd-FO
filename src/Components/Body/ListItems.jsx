import { ListItemStyle } from "../../Constants";



export default function ListItems({name,price,description,children})
{


    return (
        <div className={ListItemStyle}>
        <h3>Order</h3>
        <h4>Name:{name}</h4>
        <h4>Price:{price}</h4>
        <p>Description:{description}</p>
        </div>
    );
}