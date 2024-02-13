// Modal.js or Modal.tsx if you're using TypeScript
interface ModalProps {
    show: boolean;
    children: React.ReactNode;
    onClose: () => void;
  }

export default function Modal({ show, children, onClose }:ModalProps ) {
    if (!show) {
      return null;
    }
    return (
        <div className="  fixed inset-0 m-12 bg-black bg-opacity-50 overflow-y-auto " id="my-modal" style={{ margin: "10rem", width: "20rem"}}>
        <div className=" bg-green-200 relative top-1/4 mx-auto p-5 border w-11/12 md:max-w-md shadow-lg rounded-md bg-white">
            <div className="items-center px-4 py-3">
                <button
                    id="ok-btn"
                    className="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={onClose}
                    >
                    Close
                </button>
                <div className="mt-3 text-center">
                    {children}
                </div>
            
            </div>
        </div>
      </div>
    );
  }
  