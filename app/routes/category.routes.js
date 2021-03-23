const controller = require("../controllers/category.controller");
const { categorymiddleware } = require("../middlewares")
module.exports = function (app) {
    app.use(function (req, res, next) {
        req.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    });
    app.post("/api/categories/saveNewCategory", [categorymiddleware.checkforDuplicateCatName], controller.saveNewCategory);
    app.get("/api/categories/getAllCategories", controller.getAllCategories);
    app.delete("/api/categories/deleteCategory/:cid", controller.deleteCategory);
    app.put("/api/categories/updateCategory", [categorymiddleware.checkforDuplicateCatName], controller.updateCategory);
}


