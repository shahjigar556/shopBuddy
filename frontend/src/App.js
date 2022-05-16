import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';

function App() {
  return (
    <div className="App">
       <Header />
       <main>
          <HomeScreen />
       </main>
       <Footer/>
    </div>
  );
}

export default App;
