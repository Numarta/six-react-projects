import React from 'react';
import './index.scss';
import Modal from './Modal';

function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="App">
      <button className="open-modal-btn" onClick={() => setOpen(true)}>
        ✨ Открыть окно
      </button>
      <Modal open={open} setOpen={setOpen}>
        <h3>Это попап (модальное окно)</h3>
        <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" />
      </Modal>
    </div>
  );
}

export default App;
