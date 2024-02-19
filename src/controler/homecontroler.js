import jwt from "jsonwebtoken";
import { Op, Sequelize } from "sequelize";
import db from "../models/index";
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    let adminname = req.body.adminname;
    let password = req.body.password;
    

    let data = await db.Admin.findOne({
      where: {
        adminuser: adminname,
        password: password,
      },
      raw: true,
    });

    const token = jwt.sign({ id: data.id, name: data.adminname }, "toan");
    res.cookie("myCookie", token, { maxAge: 900000, httpOnly: true });
    return res.status(200).json(token);
  } catch (e) {
    console.log(e);
  }
};

const checklogin = async (req, res) => {
  try {
    const token = req.body.token;

    const decoded = jwt.verify(token, "toan");

    let data = await db.Admin.findOne({
      where: {
        id: decoded.id,
        adminname: decoded.name,
      },
      raw: true,
    });
    if (!data) {
      return res.status(200).json("khong phai nguoi dung");
    } else {
      return res.status(200).json({
        mesasge: true,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// category
const category = async (req, res) => {
  try {
    let category = req.body.category;
    if (category === "" || category === null) return;
    await db.Category.create({ categoryname: category });

    return res.status(200).json({
      mesasge: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};

const categoryall = async (req, res) => {
  try {
    let data = await db.Category.findAll();

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const categoryfix = async (req, res) => {
  try {
    let id = req.body.id;
    let data = await db.Category.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const categoryupdate = async (req, res) => {
  try {
    let id = req.body.id;
    let category = req.body.category;

    await db.Category.update(
      { categoryname: category },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      mesasge: 0,
      data: "thanh  cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const categorydestroy = async (req, res) => {
  try {
    let id = req.body.id;

    await db.Category.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "thanh  cong",
    });
  } catch (e) {
    console.log(e);
  }
};

// brand

const brand = async (req, res) => {
  try {
    let category = req.body.brand;
    if (category === "" || category === null) return;
    await db.Brand.create({ brandname: category });

    return res.status(200).json({
      mesasge: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};

const brandall = async (req, res) => {
  try {
    let data = await db.Brand.findAll();

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const brandfix = async (req, res) => {
  try {
    let id = req.body.id;
    let data = await db.Brand.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const brandupdate = async (req, res) => {
  try {
    let id = req.body.id;
    let category = req.body.brand;

    await db.Brand.update(
      { brandname: category },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      mesasge: 0,
      data: "thanh  cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const branddestroy = async (req, res) => {
  try {
    let id = req.body.id;

    await db.Brand.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "thanh  cong",
    });
  } catch (e) {
    console.log(e);
  }
};

// product

const getallcategory = async (req, res) => {
  try {
    let data = await db.Category.findAll();

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const getallbrand = async (req, res) => {
  try {
    let data = await db.Brand.findAll();

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const creatproduct = async (req, res) => {
  try {
    let data = await db.Product.findOrCreate({
      where: {
        productname: req.body.productname,
      },
      defaults: {
        productname: req.body.productname,
        brand_id: req.body.brand_id,
        category_id: req.body.category_id,
        productdes: req.body.productdes,
        price: +req.body.price,
        type: req.body.type,
        image: req.body.image,
      },
      raw: true,
      nest: true,
    });

    if (data && data[1] === false) {
      return res.status(200).json({
        mesasge: 1,
        data: "that bai",
      });
    }

    return res.status(200).json({
      mesasge: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const updateproduct = async (req, res) => {
  try {
    await db.Product.update(
      {
        productname: req.body.productname,
        brand_id: req.body.brand_id,
        category_id: req.body.category_id,
        productdes: req.body.productdes,
        price: +req.body.price,
        type: req.body.type,
        image: req.body.image,
      },
      {
        where: {
          id: req.body.id,
        },

        raw: true,
        nest: true,
      }
    );

    return res.status(200).json({
      mesasge: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const deleteproduct = async (req, res) => {
  try {
    let id = req.body.id;
    await db.Product.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};

const getallproduct = async (req, res) => {
  try {
    let type = req.body.type;
    let check = req.body.check;
    if (type === "all") {
      if (check) {
        if (check === "reduce") {
          let data = await db.Product.findAll({
            order: [["price", "ASC"]],
            include: [{ model: db.Star, as: "starall" }],
            limit: 8,
            raw: false,
            nest: true,
          });

          if (data) {
            for (let i = 0; i < data.length; i++) {
              data[i].image = new Buffer(data[i].image, "base64").toString(
                "binary"
              );
            }
          }

          return res.status(200).json({
            mesasge: 0,
            data: data,
          });
        } else {
          let data = await db.Product.findAll({
            order: [["price", "DESC"]],
            include: [{ model: db.Star, as: "starall" }],
            limit: 8,
            raw: false,
            nest: true,
          });

          if (data) {
            for (let i = 0; i < data.length; i++) {
              data[i].image = new Buffer(data[i].image, "base64").toString(
                "binary"
              );
            }
          }

          return res.status(200).json({
            mesasge: 0,
            data: data,
          });
        }
      } else {
        let data = await db.Product.findAll({
          include: [{ model: db.Star, as: "starall" }],
          limit: 8,
          raw: false,
          nest: true,
        });

        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          mesasge: 0,
          data: data,
        });
      }
    } else {
      let data = await db.Product.findAll({
        where: {
          id: +type,
        },
        include: [{ model: db.Star, as: "starall" }],
        raw: false,
        nest: true,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        mesasge: 0,
        data: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const gettypeproduct = async (req, res) => {
  try {
    let type = req.body.type;

    let data = await db.Product.findAll({
      where: {
        type: +type,
      },
      include: [{ model: db.Star, as: "starall" }],
      limit: 8,
      raw: false,
      nest: true,
    });

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const getalltypeproduct = async (req, res) => {
  try {
    let type = req.body.type;
    let check = req.body.check;
    let limit = 9;
    let offset = (+req.body.page - 1) * limit;

    let brand = await db.Category.findAll({
      where: {
        categoryname: type,
      },

      raw: true,
      nest: true,
    });

    let count = await db.Product.findAll({
      where: {
        category_id: brand[0].id,
      },
    });

    if (brand && check) {
      if (check === "reduce") {
        let data = await db.Product.findAll({
          order: [["price", "ASC"]],
          where: {
            category_id: brand[0].id,
          },
          include: [{ model: db.Star, as: "starall" }],
          limit,
          offset,
          raw: false,
          nest: true,
        });

        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          mesasge: 0,
          data: data,
          limit: limit,
          total: count.length,
          page: 1,
        });
      } else {
        let data = await db.Product.findAll({
          order: [["price", "DESC"]],
          where: {
            category_id: brand[0].id,
          },
          include: [{ model: db.Star, as: "starall" }],
          limit,
          offset,

          raw: false,
          nest: true,
        });

        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          mesasge: 0,
          data: data,
          limit: limit,
          total: count.length,
          page: 1,
        });
      }
    } else {
      let data = await db.Product.findAll({
        where: {
          category_id: brand[0].id,
        },
        include: [{ model: db.Star, as: "starall" }],
        limit,
        offset,

        raw: false,
        nest: true,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        mesasge: 0,
        data: data,
        limit: limit,
        total: count.length,
        page: 1,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const getalltypeproductbrand = async (req, res) => {
  try {
    let type = req.body.type;
    let check = req.body.check;
    let limit = 9;
    let offset = (+req.body.page - 1) * limit;

    let brand = await db.Brand.findAll({
      where: {
        brandname: type,
      },
      raw: true,
      nest: true,
    });
    let count = await db.Product.findAll({
      where: {
        brand_id: brand[0].id,
      },
      include: [{ model: db.Star, as: "starall" }],
      raw: false,
      nest: true,
    });

    if (brand && check) {
      if (check === "reduce") {
        let data = await db.Product.findAll({
          order: [["price", "ASC"]],
          where: {
            brand_id: brand[0].id,
          },
          include: [{ model: db.Star, as: "starall" }],
          limit,
          offset,

          raw: false,
          nest: true,
        });

        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          mesasge: 0,
          data: data,
          limit: limit,
          total: count.length,
          page: 1,
        });
      } else {
        let data = await db.Product.findAll({
          order: [["price", "DESC"]],
          where: {
            brand_id: brand[0].id,
          },
          include: [{ model: db.Star, as: "starall" }],
          limit,
          offset,

          raw: false,
          nest: true,
        });

        if (data) {
          for (let i = 0; i < data.length; i++) {
            data[i].image = new Buffer(data[i].image, "base64").toString(
              "binary"
            );
          }
        }

        return res.status(200).json({
          mesasge: 0,
          data: data,
          limit: limit,
          total: count.length,
          page: 1,
        });
      }
    } else {
      let data = await db.Product.findAll({
        where: {
          brand_id: brand[0].id,
        },
        include: [{ model: db.Star, as: "starall" }],
        limit,
        offset,

        raw: false,
        nest: true,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }

      return res.status(200).json({
        mesasge: 0,
        data: data,
        limit: limit,
        total: count.length,
        page: 1,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const getcountproduct = async (req, res) => {
  try {
    let rolex = await db.Category.findAll({
      where: {
        categoryname: "ROLEX",
      },
      limit: 1,
      raw: true,
      nest: true,
    });
    let hublot = await db.Category.findAll({
      where: {
        categoryname: "HUBLOT",
      },
      limit: 1,
      raw: true,
      nest: true,
    });
    let donghodayda = await db.Brand.findAll({
      where: {
        brandname: "ĐỒNG HỒ DÂY DA",
      },
      limit: 1,
      raw: true,
      nest: true,
    });
    let donghodaykimloai = await db.Brand.findAll({
      where: {
        brandname: "ĐỒNG HỒ DÂY KIM LOẠI",
      },
      limit: 1,
      raw: true,
      nest: true,
    });
    let datadonghoco = await db.Product.findAll({
      attributes: { exclude: ["image"] },
      raw: true,
      nest: true,
    });
    let datarolex = await db.Product.findAll({
      where: {
        category_id: rolex[0].id,
      },

      attributes: { exclude: ["image"] },
      raw: true,
      nest: true,
    });
    let datahublot = await db.Product.findAll({
      where: {
        category_id: hublot[0].id,
      },

      attributes: { exclude: ["image"] },
      raw: true,
      nest: true,
    });
    let datadonghodayda = await db.Product.findAll({
      where: {
        brand_id: donghodayda[0].id,
      },

      attributes: { exclude: ["image"] },
      raw: true,
      nest: true,
    });
    let datadonghodaykimloai = await db.Product.findAll({
      where: {
        brand_id: donghodaykimloai[0].id,
      },

      attributes: { exclude: ["image"] },
      raw: true,
      nest: true,
    });

    return res.status(200).json({
      mesasge: 0,
      data: {
        hublot: datahublot.length,
        rolex: datarolex.length,
        donghoco: datadonghoco.length,
        donghodayda: datadonghodayda.length,
        donghodaykimloai: datadonghodaykimloai.length,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
const searchproduct = async (req, res) => {
  try {
    let type = req.body.type;
    let data = await db.Product.findAll({
      where: {
        productname: { [Op.like]: `%${type}%` },
      },
      include: [{ model: db.Star, as: "starall" }],

      raw: false,
      nest: true,
    });
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }
    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

// detail

const creatdetail = async (req, res) => {
  try {
    let data = await db.Detail.create({
      product_id: req.body.id,
      image: req.body.image,
    });

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const getalldetail = async (req, res) => {
  try {
    let id = req.body.type;

    let data = await db.Detail.findAll({
      where: {
        product_id: +id,
      },
      limit: 6,
      raw: true,
      nest: true,
    });

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
// custumer
const custumer = async (req, res) => {
  try {
    let password = bcrypt.hashSync(req.body.password, 10);

    let data = await db.Custumer.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: password,
      },
      raw: true,
      nest: true,
    });
    if (data && data[1] === false) {
      return res.status(200).json({
        mesasge: 1,
        data: "that bai",
      });
    }

    return res.status(200).json({
      mesasge: 0,
      data: "thanhcong",
    });
  } catch (e) {
    console.log(e);
  }
};

const custumerlogin = async (req, res) => {
  try {
    let data = await db.Custumer.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (data) {
      let haspass = await bcrypt.compare(req.body.password, data.password);
      if (haspass) {
        return res.status(200).json({
          mesasge: 0,
          data: data,
        });
      } else {
        return res.status(200).json({
          mesasge: 1,
          data: "that bai",
        });
      }
    } else {
      return res.status(200).json({
        mesasge: 2,
        data: "ten tai khoan sai",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
// cart
const cart = async (req, res) => {
  try {
    let data = await db.Cart.findOrCreate({
      where: {
        product_id: req.body.product_id,
        custumer_id: req.body.custumer_id,
      },
      defaults: {
        product_id: req.body.product_id,
        custumer_id: req.body.custumer_id,
        productname: req.body.productname,
        price: req.body.price,
        quancity: req.body.quancity,
        image: req.body.image,
      },
      raw: true,
      nest: true,
    });

    if (data && data[1] === false) {
      await db.Cart.update(
        { quancity: data[0].quancity + req.body.quancity },
        {
          where: {
            product_id: req.body.product_id,
          },
        }
      );
    }
    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const getcart = async (req, res) => {
  try {
    let id = req.body.id;
    let data = await db.Cart.findAll({
      where: {
        custumer_id: id,
      },
    });
    console.log(data);
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const getcartupdate = async (req, res) => {
  try {
    let arr = req.body.arr;
    let id = req.body.id;
    let data = await db.Cart.findAll({
      where: {
        custumer_id: id,
      },
    });
    let promises = [];
    async function updatecart(id, quancity) {
      let res = await db.Cart.update(
        { quancity: quancity },
        {
          where: {
            id: id,
          },
        }
      );
      return res;
    }
    if (data.length === arr.length) {
      arr.forEach((item, index) => {
        let id = data[index].id;
        let quancity = item;
        promises.push(updatecart(id, quancity));
      });
      await Promise.all(promises);
    }
    return res.status(200).json({
      message: 0,
      data: req.body.arr,
    });
  } catch (e) {
    console.log(e);
  }
};
const deletecart = async (req, res) => {
  try {
    let id = req.body.id;
    await db.Cart.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
// order
const order = async (req, res) => {
  try {
    let data = await db.Order.create({
      product_id: req.body.product_id,
      productname: req.body.productname,
      custumer_id: req.body.custumer_id,
      quancity: req.body.quancity,
      price: req.body.price,
      image: req.body.image,
      status: req.body.status,
      phone: req.body.phone,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      city: req.body.city,
      description: req.body.description,
    });
    console.log(req.body.product_id);
    await db.Cart.destroy({
      where: {
        product_id: req.body.product_id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
const getorder = async (req, res) => {
  try {
    let id = req.body.id;
    if (id) {
      let data = await db.Order.findAll({
        where: {
          custumer_id: id,
        },
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }
      return res.status(200).json({
        mesasge: 0,
        data: data,
      });
    } else {
      let limit = 3;
      let offset = (+req.body.page - 1) * limit;
      let count = await db.Order.count();

      let data = await db.Order.findAll({
        limit,
        offset,
        raw: true,
        nest: true,
      });

      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].image = new Buffer(data[i].image, "base64").toString(
            "binary"
          );
        }
      }
      return res.status(200).json({
        mesasge: 0,
        data: data,
        limit: limit,
        total: count,
        page: 1,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const updateorder = async (req, res) => {
  try {
    let id = req.body.id;

    let data = await db.Order.update(
      { status: req.body.status },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const deleteorder = async (req, res) => {
  try {
    let id = req.body.id;
    await db.Order.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "thanh cong",
    });
  } catch (e) {
    console.log(e);
  }
};
// star
const star = async (req, res) => {
  try {
    let id = req.body.id;
    let data = await db.Star.create({
      product_id: id,
      star: req.body.star,
    });

    await db.Order.destroy({
      where: {
        product_id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "oke",
    });
  } catch (e) {
    console.log(e);
  }
};
const getstar = async (req, res) => {
  try {
    let data = await db.Star.findAll();

    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const whitlist = async (req, res) => {
  try {
    await db.Whitlist.findOrCreate({
      where: {
        product_id: req.body.product_id,
        custumer_id: req.body.custumer_id,
      },
      defaults: {
        product_id: req.body.product_id,
        custumer_id: req.body.custumer_id,
        productname: req.body.productname,
        price: req.body.price,
        image: req.body.image,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "oke",
    });
  } catch (e) {
    console.log(e);
  }
};
const getallwhitlist = async (req, res) => {
  try {
    let id = req.body.id;
    let data = await db.Whitlist.findAll({
      where: {
        custumer_id: id,
      },
    });

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }
    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};
const deletewhitlist = async (req, res) => {
  try {
    let id = req.body.id;
    await db.Whitlist.destroy({
      where: {
        product_id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "oke",
    });
  } catch (e) {
    console.log(e);
  }
};
const comment = async (req, res) => {
  try {
    await db.Comment.create({
      name: req.body.name,
      description: req.body.description,
      custumer_id: req.body.custumer_id,
      product_id: req.body.product_id,
      raiting: req.body.raiting,
      image: req.body.image,
      now: req.body.now,
    });

    return res.status(200).json({
      mesasge: 0,
      data: "oke",
    });
  } catch (e) {
    console.log(e);
  }
};
const getcomment = async (req, res) => {
  try {
    let id = req.body.id;
    let data = await db.Comment.findAll({
      where: {
        product_id: id,
      },
    });

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }
    return res.status(200).json({
      mesasge: 0,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

const deletecomment = async (req, res) => {
  try {
    let id = req.body.id;
    await db.Comment.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      mesasge: 0,
      data: "oke",
    });
  } catch (e) {
    console.log(e);
  }
};
// pagination
const pagination = async (req, res) => {
  try {
    let limit = 9;
    let offset = (+req.query.page - 1) * limit;

    let count = await db.Product.count();
    let data = await db.Product.findAll({
      limit,
      offset,
      include: [{ model: db.Star, as: "starall" }],

      raw: false,
      nest: true,
    });
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].image = new Buffer(data[i].image, "base64").toString("binary");
      }
    }
    res.status(200).json({
      data: data,
      limit: limit,
      total: count,
      page: 1,
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  login,
  checklogin,
  category,
  categoryall,
  categoryfix,
  categoryupdate,
  categorydestroy,
  brand,
  brandall,
  brandfix,
  brandupdate,
  branddestroy,
  getallcategory,
  getallbrand,
  creatproduct,
  getallproduct,
  creatdetail,
  getalldetail,
  custumer,
  custumerlogin,
  cart,
  getcart,
  getcartupdate,
  order,
  getorder,
  star,
  getstar,
  deletecart,
  deleteorder,
  updateorder,
  gettypeproduct,
  getalltypeproduct,
  getalltypeproductbrand,
  updateproduct,
  deleteproduct,
  searchproduct,
  getcountproduct,
  whitlist,
  getallwhitlist,
  deletewhitlist,
  comment,
  getcomment,
  deletecomment,
  pagination,
};
