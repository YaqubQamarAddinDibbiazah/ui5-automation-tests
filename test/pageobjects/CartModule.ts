import Button from "sap/m/Button";
import List from "sap/m/List";

class CartModule{
    get cartItemsList(){
            return browser.asControl<List>({
                selector : {
                    controlType : "sap.m.List",
                    properties : {
                        noDataText : "Your cart is empty"
                    }
                }
            })
        }

    get proceedButton(){
        return browser.asControl<Button>({
            selector : {
                controlType : "sap.m.Button",
                properties : {text : "Proceed"}
            }
        })
    }

    // methods

    async getCartItemCount(){

        const list = await this.cartItemsList

        const cartItems = await list.getAggregation("items")
        if (!cartItems){
            console.warn('cart empty')
            return 0
        }
        for (let item of cartItems){
            let title = await (item as any).getProperty('title') 
            console.warn(title)
        }

        return cartItems.length
    }
}

export default new CartModule()