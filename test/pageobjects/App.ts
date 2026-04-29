import HomePage from './HomePage';
import CartModule from './CartModule';
import CheckoutPage from './CheckoutPage';

class App {
    public home = HomePage;
    public cart = CartModule;
    public checkout = CheckoutPage;
}

export default new App();
