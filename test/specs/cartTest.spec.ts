// import List from "sap/m/List"
// import SearchField from "sap/m/SearchField"
// import StandardListItem from "sap/m/StandardListItem"
// import Title from "sap/m/Title"
// import ToggleButton from "sap/m/ToggleButton"
import App from '../pageobjects/App';
import { users } from '../data/checkoutData';

// describe('cart actions with no POM', () =>{
//     beforeEach(async() => {
//         await browser.maximizeWindow()
//         await wdi5.goTo("#/")
//     })
//
//     // it('open accessories', async() => {
//     //     let accessoriesButton = await browser.asControl<StandardListItem>({
//     //         selector : {
//     //             controlType : "sap.m.StandardListItem",
//     //             properties : {
//     //                 title : "Accessories"
//     //             }
//     //         }
//     //     })
//     //     await accessoriesButton.press()
//     //     const accessoriesPage = await browser.asControl({
//     //         selector : {
//     //             controlType : "sap.m.Title",
//     //             properties : {
//     //                 text : "Accessories"
//     //             }
//     //         }
//     //     })
//     //     const actualTitle = await accessoriesPage.getProperty("text")

//     //     expect(actualTitle).toEqual("Accessories")
//     // })

//     // it ('insertion and input check', async() => {
//     //     const searchField = await browser.asControl<SearchField>({
//     //         selector : {
//     //             controlType : "sap.m.SearchField",
//     //         }
//     //     })

//     //     await searchField.enterText('Bluetooth')
//     //     const enteredValue = await searchField.getValue()
//     //     expect(enteredValue).toEqual('Bluetooth')
//     //     await browser.pause(5000)
//     // })

//     // it('checking cart active', async () => {
//     //     const cartButton = await browser.asControl<ToggleButton>({
//     //         selector : {
//     //             controlType : "sap.m.ToggleButton",
//     //             properties : {
//     //                 icon : "sap-icon://cart"
//     //             }
//     //         }
//     //     })

//     //     await cartButton.press()
//     //     const rightMenuTitle = await browser.asControl<Title>({
//     //         selector : {
//     //             controlType : "sap.m.Title",
//     //             properties : {
//     //                 text : "Shopping Cart"
//     //             }
//     //         }
//     //     })
//     //     const desiredText = await rightMenuTitle.getText()
//     //     expect(desiredText).toEqual("Shopping Cart")
//     // })

// it('find parent element and extract the child elements', async() =>{
//     const list = await browser.asControl<List>({
//         selector : {
//             controlType : "sap.m.List",
//             properties : {
//                 id : /categoryList$/
//             }
//         }
//     })

//     let allItems = await list.getAggregation("items")
//     expect(allItems.length).toBeGreaterThan(0)
//     console.warn(`total items number = ${allItems.length}`)

//     let categoryNames : string[] = []
//     for(let item of allItems){
//         let title = await (item as any).getProperty("title") as string
//         categoryNames.push(title)
//     }
//     console.warn(categoryNames)
//     expect(categoryNames).toContain('Accessories')

// })
// })

describe('cart actions with POM', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
        await App.home.open();
    });

    users.forEach((data) => {
        it('full purchase cycle', async () => {
            await App.home.searchFor(data.productToSearch);
            const aquiredCategories = await App.home.getProductList();
            expect(aquiredCategories.length).toBeGreaterThan(0);
            await App.home.clickProduct(data.productToClick);
            await App.home.addToCart();
            await App.home.openCart();
            const count = await App.cart.getCartItemCount();
            expect(count).toBeGreaterThan(0);
            await browser.pause(2000);

            await (await App.cart.proceedButton).press();

            await App.checkout.selectPaymentMethodAndProceed('Credit Card');
            await App.checkout.insertCardDetailsAndProceed(
                data.card.name,
                data.card.number,
                data.card.secCode,
                data.card.expDate
            );
            await App.checkout.fillDetailsAndProceed(
                data.address.street,
                data.address.city,
                data.address.zip,
                data.address.country,
                data.address.note
            );
            await App.checkout.selectDeliveryAndSummary(data.delivery);
            await App.checkout.submitOrder();
            const finalText = await browser.asControl({
                selector: {
                    controlType: 'sap.m.Title',
                    properties: {
                        text: 'Order Completed',
                    },
                },
            });
            expect(finalText.getVisible).toBeTruthy();
            await browser.pause(1000);
        });
    });
});
