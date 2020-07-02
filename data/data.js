const allData = {
    getNav(){
        var navData;
        return navData = [{
            url: "/",
            string: "Home"
        },
        {
            url: "MealsPackage",
            string: "Meal Package Page"
        },
        {
            url: "Registration",
            string: "Sign Up"
        },
        {
            url: "Login",
            string: "Login"
        }]
    },
    
    getContent(){
        var contentData;
        return contentData = [{
            path: "image/pick.png",
            title: "Pick",
            text: "100+ menu of all-natural dishes."
        },
        {
            path: "image/heat.png",
            title: "Heat",
            text: "Cooked & delivered."
        },
        {
            path: "image/eat.png",
            title: "Eat",
            text: "Delicious & nutritious."
        }]
    },

    getMeal(){
        var mealData;
        return mealData = [{
            path: "image/meal1.png",
            title: "Unadon",
            price: "$16.99",
            istopmeal: true
        },
        {
            path: "image/meal2.png",
            title: "Chinese Hotpot",
            price: "$22.68",
            istopmeal: true
        },
        {
            path: "image/meal3.png",
            title: "Pepperoni Pizza",
            price: "$12.19",
            istopmeal: true
        },
        {
            path: "image/meal4.png",
            title: "Matcha Red Bean Bowl",
            price: "$11.49",
            istopmeal: true
        },
        {
            path: "image/pack1.png",
            title: "Value",
            price: "$31.80",
            desc: "All of our bestselling Value meals in one package for even less",
            istopmeal: false
        },
        {
            path: "image/pack2.png",
            title: "Veggie",
            price: "$28.99",
            desc: "A vegetarian-friendly package with a natural and nutrient-rich approach",
            istopmeal: false
        }]
    }
}

module.exports = allData;