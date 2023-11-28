exports.getHomeDetails = (req, res) => {
  const obj = {
    "Data": "Home page details",
    "image": "http://localhost:3000/imgs/men/shirts/hoodie.jpeg"
  };

  res.send(JSON.stringify(obj));
};
