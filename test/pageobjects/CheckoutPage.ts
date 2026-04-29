import BasePage from './BasePage';
import Button from 'sap/m/Button';
import Input from 'sap/m/Input';
import MaskInput from 'sap/m/MaskInput';
import DatePicker from 'sap/m/DatePicker';
import TextArea from 'sap/m/TextArea';

class CheckoutPage extends BasePage {
    //static getters

    get cardHolderNameInput() {
        return browser.asControl<Input>({
            selector: {
                controlType: 'sap.m.Input',
                properties: {
                    placeholder: 'Enter card holder name',
                },
            },
        });
    }

    get cardNumberInput() {
        return browser.asControl<MaskInput>({
            selector: {
                controlType: 'sap.m.MaskInput',
                properties: {
                    placeholder: 'Enter card number',
                },
            },
        });
    }

    get securityCodeInput() {
        return browser.asControl<MaskInput>({
            selector: {
                controlType: 'sap.m.MaskInput',
                properties: {
                    placeholder: 'Enter the 3-digits security number',
                },
            },
        });
    }

    get expirationDateInput() {
        return browser.asControl<DatePicker>({
            selector: {
                controlType: 'sap.m.DatePicker',
                properties: {
                    id: /creditCardExpirationDate$/,
                },
            },
        });
    }

    get streetInput() {
        return browser.asControl<Input>({
            selector: {
                controlType: 'sap.m.Input',
                properties: {
                    placeholder: 'Enter your street name and house number',
                },
            },
        });
    }

    get cityInput() {
        return browser.asControl<Input>({
            selector: {
                controlType: 'sap.m.Input',
                properties: {
                    placeholder: 'Enter your city',
                },
            },
        });
    }

    get zipCodeInput() {
        return browser.asControl<Input>({
            selector: {
                controlType: 'sap.m.Input',
                properties: {
                    placeholder: 'Enter your zip code',
                },
            },
        });
    }

    get countryInput() {
        return browser.asControl<Input>({
            selector: {
                controlType: 'sap.m.Input',
                properties: {
                    placeholder: 'Enter your country',
                },
            },
        });
    }

    get optionalNoteInput() {
        return browser.asControl<TextArea>({
            selector: {
                controlType: 'sap.m.TextArea',
                properties: {
                    placeholder: 'Additional comments (max 500 characters)',
                },
            },
        });
    }

    get orderSummaryButton() {
        return browser.asControl<Button>({
            selector: {
                controlType: 'sap.m.Button',
                properties: {
                    text: 'Order Summary',
                },
            },
        });
    }

    get submitOrderButton() {
        return browser.asControl<Button>({
            selector: {
                controlType: 'sap.m.Button',
                properties: { text: 'Submit' },
            },
        });
    }

    get confirmYesButton() {
        return browser.asControl<Button>({
            selector: {
                controlType: 'sap.m.Button',
                properties: { text: 'Yes' },
            },
        });
    }

    //dynamic getters

    async getPaymentMethod(methodName: 'Credit Card' | 'Bank Transfer' | 'Cash on Delivery') {
        return browser.asControl<Button>({
            selector: {
                controlType: 'sap.m.Button',
                properties: {
                    text: methodName,
                },
            },
        });
    }

    async getStepButton(stepText: string) {
        return browser.asControl<Button>({
            selector: {
                controlType: 'sap.m.Button',
                properties: {
                    text: stepText,
                },
            },
        });
    }

    async getDeliveryTypeButton(orderType: 'Standard' | 'Express') {
        return browser.asControl<Button>({
            selector: {
                controlType: 'sap.m.Button',
                properties: {
                    text: orderType,
                },
            },
        });
    }

    //methods

    async selectPaymentMethodAndProceed(
        paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Cash on Delivery'
    ) {
        await (await this.getStepButton('Step 2')).press();
        await (await this.getPaymentMethod(paymentMethod)).press();
        await (await this.getStepButton('Step 3')).press();
    }

    async insertCardDetailsAndProceed(
        name: string,
        cardNumber: string,
        securityCode: string,
        expDate: string
    ) {
        await (await this.cardHolderNameInput).enterText(name);
        await (await this.cardNumberInput).enterText(cardNumber);
        await (await this.securityCodeInput).enterText(securityCode);
        await (await this.expirationDateInput).enterText(expDate);

        await (await this.getStepButton('Step 4')).press();
    }

    async fillDetailsAndProceed(
        street: string,
        city: string,
        zipCode: string,
        country: string,
        note: string = ''
    ) {
        await (await this.streetInput).enterText(street);
        await (await this.cityInput).enterText(city);
        await (await this.zipCodeInput).enterText(zipCode);
        await (await this.countryInput).enterText(country);
        if (note) {
            await (await this.optionalNoteInput).enterText(note);
        }

        await (await this.getStepButton('Step 5')).press();
    }

    async selectDeliveryAndSummary(orderType: 'Standard' | 'Express') {
        await (await this.getDeliveryTypeButton(orderType)).press();
        await (await this.orderSummaryButton).press();
    }

    async submitOrder() {
        await (await this.submitOrderButton).press();
        await (await this.confirmYesButton).press();
    }
}

export default new CheckoutPage();
