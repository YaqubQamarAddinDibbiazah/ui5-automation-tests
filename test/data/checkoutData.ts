export const users = [
    {
        testName: 'flat basic purchase using credit card',
        productToSearch: 'Flat',
        productToClick: 'Flat Basic',
        paymentMethod: 'Credit Card' as const,
        card: {
            name: 'Alex Time',
            number: '1127870516227313',
            secCode: '768',
            expDate: '072045',
        },
        address: {
            street: 'Gerrymander st',
            city: 'Acapulco',
            zip: '01351',
            country: 'Mexico',
            note: 'a scuba diver wants a TV for themselves',
        },
        delivery: 'Standard' as const,
    },
    {
        testName: 'flat basic purchase using credit card',
        productToSearch: 'Laptop',
        productToClick: 'Astro Laptop 1516',
        paymentMethod: 'Credit Card' as const,
        card: {
            name: 'Pater Friedrich',
            number: '1271000136510171',
            secCode: '163',
            expDate: '072035',
        },
        address: {
            street: 'Tresspassing st',
            city: 'Guadalajara',
            zip: '01351',
            country: 'Spain',
            note: 'an aspiring trash stream celebrity has decided to purchase a laptop, will u help?',
        },
        delivery: 'Express' as const,
    },
];
