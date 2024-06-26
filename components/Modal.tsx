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
        <div 
          data-testid="backdrop"
          className="fixed inset-0 " id="my-modal" onClick={onClose} style={{backgroundColor: "rgba(0,0,0,0.5)", margin: "0", paddingTop:"0", top:"-30%"}}> 
          <div className=" bg-gray-100 relative top-1/4 mx-auto p-5 border w-11/12 md:max-w-md shadow-lg rounded-md "  onClick={e => e.stopPropagation()} >
              <div className="items-center px-4 py-3">
                <div className="flex justify-end">
                    <button
                        id="ok-btn"
                        data-testid="close-modal-button"
                        className=" "
                        onClick={onClose}
                        >
                        <img className="block w-6 h-6" src="/images/closeIMG.png" alt="notWorking"/>
                    </button>
                </div>
                <div className="mt-3 text-center">
                    {children}
                </div>
              </div>
          </div>
        </div>
        
    );
  }
  