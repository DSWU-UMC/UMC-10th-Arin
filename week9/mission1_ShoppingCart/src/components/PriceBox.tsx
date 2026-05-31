import { useSelector, useDispatch } from '../hooks/useCustomRedux';
// modal 사용을 위한 삭제
// import { clearCart } from '../slices/cartSlice';
import { openModal } from '../slices/modalSlice';

const PriceBox = () => {
    const { total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // modal 사용을 위한 삭제
    /*
    const handleInitializeCart = () => {
        dispatch(clearCart());
    };
    */

    return (
        <div className='p-12 flex justify-between'>
            <button 
                // modal 사용을 위한 삭제
                // onClick={handleInitializeCart}
                onClick={() => dispatch(openModal())}
                className='border p-4 rounded-md cursor-pointer'
            >
                장바구니 초기화
            </button>
            <div>총 가격: {total}원</div>
        </div>
    );
};

export default PriceBox;