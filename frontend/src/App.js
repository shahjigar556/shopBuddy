import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen'


function App() {
  return (
    <>
        <div className="App">
          <Header />
          <main>
              <Route exact path='/' component={HomeScreen} />
              <Route exact path='/signin' component={LoginScreen} />
              <Route exact path='/profile' component={ProfileScreen} />
              <Route exact path='/register' component={RegisterScreen} />
              <Route exact path='/product/:id' component={ProductScreen} />
              <Route exact path='/cart/:id?' component={CartScreen} />
          </main>
          <Footer/>
        </div>
    </>
  );
}

export default App;
