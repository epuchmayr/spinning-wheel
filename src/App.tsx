import './App.scss';
import SpinningWheel from './components/SpinningWheel';


function App() {

  return (
    <>
      <div style={{'width': 'clamp(10rem, 50vW, 50rem)'}}>
        <SpinningWheel />
      </div>
    </>
  );
}

export default App;
