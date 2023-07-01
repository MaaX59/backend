const app = require("./app");


// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV}`);
});
