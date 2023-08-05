require("dotenv").config();

const axios = require('axios');

let user_id = "";

describe("Scrapper – Backend Integration Tests", () => {

    test ("Testing /update_products Endpoint to update products' prices", () => {
        const response_promise = axios.get(
            "http://188.166.191.110:5000/update_products"
        );
        response_promise.then((res) => {
            expect(res.status).toEqual(200);
            expect(res.data).toEqual("Updated")
        });
    });
    test ("Testing /update_platforms Endpoint to update platform discounts", () => {
        const response_promise = axios.get(
            "http://188.166.191.110:5000/update_platforms"
        );
        response_promise.then((res) => {
            expect(res.status).toEqual(200);
            expect(res.data).toEqual("Updated")
        });
    });
})