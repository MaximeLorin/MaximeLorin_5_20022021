const createArticles = require("./js/index");

test("How many articles", () => {
  const object = {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "http://localhost:3000/images/vcam_1.jpg",
    lenses: ["35mm 1.4", "50mm 1.6"],
    length: 2,
    name: "Zurss 50S",
    price: 49900,
    _id: "5be1ed3f1c9d44000030b061",
  };
  const total = createArticles();
  // expect(createArticles.);
});
