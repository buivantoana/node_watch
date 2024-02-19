import express from "express";
let router = express.Router();
import homecontroler from "../controler/homecontroler";

const initwed = (app) => {
  // Admin
  router.post("/login", homecontroler.login);
  router.post("/checklogin", homecontroler.checklogin);
  //Category
  router.post("/category", homecontroler.category);
  router.get("/categoryall", homecontroler.categoryall);
  router.post("/categoryfix", homecontroler.categoryfix);
  router.post("/categoryupdate", homecontroler.categoryupdate);
  router.post("/categorydestroy", homecontroler.categorydestroy);
  //  brand
  router.post("/brand", homecontroler.brand);
  router.get("/brandall", homecontroler.brandall);
  router.post("/brandfix", homecontroler.brandfix);
  router.post("/brandupdate", homecontroler.brandupdate);
  router.post("/branddestroy", homecontroler.branddestroy);
  // product
  router.get("/getallcategory", homecontroler.getallcategory);
  router.get("/getallbrand", homecontroler.getallbrand);
  router.post("/creatproduct", homecontroler.creatproduct);
  router.post("/getallproduct", homecontroler.getallproduct);
  router.post("/gettypeproduct", homecontroler.gettypeproduct);
  router.post("/getalltypeproduct", homecontroler.getalltypeproduct);
  router.post("/getalltypeproductbrand", homecontroler.getalltypeproductbrand);
  router.post("/searchproduct", homecontroler.searchproduct);
  router.post("/updateproduct", homecontroler.updateproduct);
  router.post("/deleteproduct", homecontroler.deleteproduct);
  router.get("/getcountproduct", homecontroler.getcountproduct);

  // detail
  router.post("/creatdetail", homecontroler.creatdetail);
  router.post("/getalldetail", homecontroler.getalldetail);
  //  custumer
  router.post("/custumer", homecontroler.custumer);
  router.post("/custumerlogin", homecontroler.custumerlogin);
  //  cart
  router.post("/cart", homecontroler.cart);
  router.post("/getcart", homecontroler.getcart);
  router.post("/deletecart", homecontroler.deletecart);
  router.post("/getcartupdate", homecontroler.getcartupdate);
  //  order
  router.post("/order", homecontroler.order);
  router.post("/getorder", homecontroler.getorder);
  router.post("/updateorder", homecontroler.updateorder);
  router.post("/deleteorder", homecontroler.deleteorder);
  //  star
  router.post("/star", homecontroler.star);
  router.get("/getstar", homecontroler.getstar);
  //  whitlist
  router.post("/whitlist", homecontroler.whitlist);
  router.post("/getallwhitlist", homecontroler.getallwhitlist);
  router.post("/deletewhitlist", homecontroler.deletewhitlist);
  //  comment
  router.post("/comment", homecontroler.comment);
  router.post("/getcomment", homecontroler.getcomment);
  router.post("/deletecomment", homecontroler.deletecomment);
  //  panigation
  router.post("/pagination", homecontroler.pagination);

  return app.use("/", router);
};

export default initwed;
