import './App.css';
import { StarMatch } from './Component/StarMatch';
function App() {

  const ar1 = [1, 2, 3, 4, 5, 6, 7];
  const ar2 = [3, 5, 7];
  console.log(ar1);
  ar2.forEach((e2) => {
    ar1.splice(e2, 1);
  });
  console.log(ar1);

  return (
    <div className="App">
      <StarMatch />
    </div>
  );
}




// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};



export default App; 
