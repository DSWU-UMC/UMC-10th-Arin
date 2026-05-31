import CartItem from './CartItem';
import { useSelector } from '../hooks/useCustomRedux';

const CartList = () => {
    // useSelector 많이 사용해서 매번 정의하는 것이 불편함 -> 반복 사용되는 건 hooks 폴더에 넣기
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <div className='flex flex-col items-center justify-center'>
            <ul>
                {cartItems.map((item) => (
                    <CartItem key={item.id} lp={item}/>
                ))}
            </ul>
        </div>
    );
};

export default CartList;