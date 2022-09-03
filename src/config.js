let baseURI;
const dateFormat = "YYYY-MM-DD HH:MM:SS";
const reportsDateFormat = "YYYY-MM-DD";
const baseURIImage = "https://evosys.azurewebsites.net";
if (process.env.NODE_ENV !== "production") {
  baseURI = "https://wslyeng.azurewebsites.net";
} else {
  baseURI = "https://wslyeng.azurewebsites.net";
}
export { baseURI, dateFormat, baseURIImage, reportsDateFormat };
//api
//https://testevocs.azurewebsites.net
//https://devevocs.azurewebsites.net

//web service
//https://testevocsui.azurewebsites.net
