import React from 'react';

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className='text-black'>
      <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div>

<button onClick={modalData?.btn1Handler} >{modalData?.btn1Text}</button>

          <button onClick={modalData?.btn2Handler}>
            {modalData.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
