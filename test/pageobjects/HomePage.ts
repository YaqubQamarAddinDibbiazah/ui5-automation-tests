import SearchField from "sap/m/SearchField";
import List from "sap/m/List";
import ObjectListItem from "sap/m/ObjectListItem";
import Button from "sap/m/Button";
import BasePage from "./BasePage";



class HomePage extends BasePage{

    // methods

    async open(){
        await super.open("#/")
    }

    //objects :

    get addToCartButton(){
        return browser.asControl<Button>({
            selector : {
                controlType : "sap.m.Button",
                properties : {
                    text : "Add to Cart"
                }
            }
        })
    }

    

    

    //methods
    // insert the text into the textbox
    async searchFor(text: string) {
        const searchField = await browser.asControl<SearchField>({
            selector: {
                controlType: "sap.m.SearchField"
            }
        });
        await searchField.enterText(text);
    }

    // retrieve the previously inserted value
    async getSearchInputValue() {
        const searchField = await browser.asControl<SearchField>({
            selector: {
                controlType: "sap.m.SearchField"
            }
        });
        return await (searchField as any).getValue() as string;
    }

    //gather all the list elements
    async getCategoryNames(){

        const list = await browser.asControl<List>({
            selector : {
                controlType : "sap.m.List",
                properties : {
                    id : /categoryList$/
                }
            }
        })

        let allItems = await list.getAggregation("items")
        expect(allItems.length).toBeGreaterThan(0)
        console.warn(`total items number = ${allItems.length}`)

        let categoryNames : string[] = []
        for(let item of allItems){
            let title = await (item as any).getProperty("title") as string
            categoryNames.push(title)
        }
        console.warn(categoryNames)

        return categoryNames
    }

    async getProductList(){
        const list = await browser.asControl<List>({
            selector : {
                controlType : "sap.m.List",
                properties : {
                    id : /productList$/
                }
            }
        })

        let allItems = await list.getAggregation("items")

        let productsNames : string[] = []
        for(let item of allItems){
            let title = await (item as any).getProperty("title") as string
            productsNames.push(title)
        }
        console.warn(productsNames)

        return productsNames
    }

    async clickProduct(productName : string){
        const productItem = await browser.asControl<ObjectListItem>({
            selector : {
                controlType : "sap.m.ObjectListItem",
                properties : {
                    title : productName
                }
            }
        })
        await productItem.press()
    }

    async addToCart(){
        const btn = await this.addToCartButton
        await btn.press()
    }

    
}

export default new HomePage();