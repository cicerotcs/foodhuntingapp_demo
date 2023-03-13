const client = require("./db/connect");

client.connect();

const dishes = [
  {
    title: "Arepas",
    img: "https://images.pexels.com/photos/13191276/pexels-photo-13191276.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Barbecue Ribs",
    img: "https://images.pexels.com/photos/8250732/pexels-photo-8250732.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Bruschette with Tomato",
    img: "https://images.pexels.com/photos/13883697/pexels-photo-13883697.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Caesar Salad",
    img: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Cheeseburger",
    img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Arepas",
    img: "https://images.pexels.com/photos/13191276/pexels-photo-13191276.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Barbecue Ribs",
    img: "https://images.pexels.com/photos/8250732/pexels-photo-8250732.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Bruschette with Tomato",
    img: "https://images.pexels.com/photos/13883697/pexels-photo-13883697.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Caesar Salad",
    img: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
  {
    title: "Cheeseburger",
    img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    restaurant: "Burger Flavor",
    city: "New York",
  },
];

function insertData() {
  dishes.map(async (dish) => {
    let sql =
      "insert into dishes(title, img_url, restaurant, city) values($1, $2, $3, $4); ";
    const res = await client.query(sql, [
      dish.title,
      dish.img,
      dish.restaurant,
      dish.city,
    ]);
    if (res.rowCount === 1) {
      console.log("dish inserted into db");
    }
  });
  process.exit(0);
}

insertData();

function deleteData(from, to) {
  let sql = "delete from dishes where id=$1;";
  for (let i = from; i <= to; i++) {
    client.query(sql, [i], (err, res) => {
      if (!err) {
        console.log("data deleted from db");
      } else {
        console.log(err);
      }
    });
  }
  //client.end();
}

deleteData(488, 487);
