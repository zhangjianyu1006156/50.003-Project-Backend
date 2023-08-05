require("dotenv").config();

const axios = require('axios');
const { User } = require("../models/user");
const mongoose = require("mongoose");

let user_id = "";

const makeId = () => {
    let ID = "";
    let characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 16; i++) {
      ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
};

async function setup() {
    try {
        user_id = makeId();
        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            const UserModel = new User({
                user_id: user_id,
                data: data,
                name: "testing",
            });
            UserModel.save().then((_) => {
                mongoose.connection.close();
            }).catch(
                (err) => {
                    throw err;
                });
        }).catch((err) => {
            throw err;
        });
    } catch (error) {
        console.error("Setup Failed. " + error);
        throw error;
    }
}

async function teardown() {
    try {
        mongoose.connect(process.env.DATABASE_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }).then(() => {
            const UserModel = mongoose.model('User', User);
        
            // Deleting a single document
            UserModel.deleteOne({ user_id: user_id }, (err, _) => {
              if (err) {
                throw err;
              }
              mongoose.connection.close();
            });
          }).catch((err) => {
            throw err;
        });        
    } catch (error) {
        console.error("Teardown Failed. " + error);
        throw error;
    }
}

describe("Frontend – Backend Integration Tests", () => {
    beforeAll(async () => {
        await setup();
    });
    test ("Testing /products Endpoint for getResults()", () => {
        const expected = [
            {
                "product_id": "rCl2yVo6KjgZatQA",
                "name": "Kansai Airport to Namba Station (One-Way Ticket)",
                "description": "Fuji-Q Highland is one of Japan's most popular amusement park, located in the Fujiyoshida region at the foot of Mt Fuji . It is best known for its thrilling, record-breaking roller coasters and elaborate, anime- themed rides and attractions. The park strives to be at the forefront of theme park entertainment, and has been constantly opening new rides and attractions, including Guinness World Record breaking roller coasters.",
                "image": "https://ak-d.tripcdn.com/images/035261200093tn1ss0429_C_1136_640_Q60.jpg",
            },
            {
                "product_id": "pBVQUE2TsOCrdA4L",
                "name": "Nankai Rapi:t Kansai Airport Express Ticket",
                "description": "Travel instantly via the Nankai Line Airport Express, with trains departing every 60 minutes",
                "image": "https://res.klook.com/image/upload/c_fill,w_1160,h_474/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/l3ks3drwsoqdt5ubrppt.webp",
            }
        ]
        const response_promise = axios.get(
            "http://188.166.191.110:8080/products"
        );
        response_promise.then((res) => {
            expect(res.status).toEqual(200);
            res.data.sort((a, b) => (a.product_id > b.product_id) ? 1 : -1);
            expected.sort((a, b) => (a.product_id > b.product_id) ? 1 : -1);
            Object.keys(res.data).forEach((key) => {
                expect(res.data[key].product_id).toEqual(expected[key].product_id);
                expect(res.data[key].name).toEqual(expected[key].name);
                expect(res.data[key].description).toEqual(expected[key].description);
                expect(res.data[key].image).toEqual(expected[key].image);
            });
        });
    });
    test ("Testing /users Endpoint for handleBook()", () => {
        details = {
            id: user_id,
            placename: "Testing Place",
            bookingprice: 20,
            sourcewebsite: "google.com",
            images: "image1",
            rating: 5,
            bookingmode: 0,
        }

        const response_promise = axios.post("http://192.166.191.110:8080/users", { id: user_id, key: details })

        response_promise.then((res) => {
            expect(res.status).toEqual(201);
        });
    });

    test ("Testing /users/:user_id Endpoint for Booking Page (Frontend)", () => {

        details = {
            id: user_id,
            placename: "Testing Place",
            bookingprice: 20,
            sourcewebsite: "google.com",
            images: "image1",
            rating: 5,
            bookingmode: 0,
        }

        const response_promise = axios.get("http://192.166.191.110:8080/users/" + user_id)

        response_promise.then((res) => {
            expect(res.status).toEqual(200);
            expect(res.data.length).toEqual(1);
            expect(res.data[0].placename).toEqual(details.placename);
            expect(res.data[0].bookingprice).toEqual(details.bookingprice);
            expect(res.data[0].sourcewebsite).toEqual(details.sourcewebsite);
            expect(res.data[0].images).toEqual(details.images);
            expect(res.data[0].rating).toEqual(details.rating);
            expect(res.data[0].bookingmode).toEqual(details.bookingmode);
        });

    });

    afterAll(async () => {
        await teardown();
    }); 
})