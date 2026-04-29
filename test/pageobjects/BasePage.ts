import { wdi5 } from 'wdio-ui5-service';
import ToggleButton from 'sap/m/ToggleButton';

export default class BasePage {
    //methods

    async open(path: string) {
        await wdi5.goTo(path);
    }

    async openCart() {
        const btn = await this.cartButton;
        await btn.press();
    }

    //getters

    get cartButton() {
        return browser.asControl<ToggleButton>({
            selector: {
                controlType: 'sap.m.ToggleButton',
                properties: {
                    icon: 'sap-icon://cart',
                },
            },
        });
    }
}
