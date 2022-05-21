import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <>
        <div className="App">
          <Header />
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Footer/>
        </div>
    </>
  );
}

export default App;
