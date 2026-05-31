import { useSelector, useDispatch } from '../hooks/useCustomRedux';
import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';

const Modal = () => {
    const { isOpen } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white p-8 rounded-md flex flex-col items-center gap-4'>
                <p className='text-lg font-semibold'>장바구니를 비우시겠습니까?</p>
                <div className='flex gap-4'>
                    <button
                        onClick={() => {
                            dispatch(clearCart());
                            dispatch(closeModal());
                        }}
                        className='px-6 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600'
                    >
                        네
                    </button>
                    <button
                        onClick={() => dispatch(closeModal())}
                        className='px-6 py-2 bg-gray-300 text-gray-800 rounded-md cursor-pointer hover:bg-gray-400'
                    >
                        아니요
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;