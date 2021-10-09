

const myCors = cors({
    methods: ['GET', 'POST','PUT', 'DELETE', 'PATCH'],
    origin: ['http://mattzenn.nomoredomains.club', 'https://mattzenn.nomoredomains.club', 'localhost:3001', 'http://api.mattzenn.nomoredomains.club', 'https://api.mattzenn.nomoredomains.club']
});

module.exports = myCors;