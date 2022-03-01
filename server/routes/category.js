const express = require("express");
const Category = require("../models/category.js");
const slugify = require("slugify");
const { requireSignin, adminMiddleware } = require("../common-middleware/index.js");
const router = express.Router();

function createCategories(categories, parentId = null){
    const categoryList = [];
    let category;
    if(parentId == null){
        categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cate of category){
        categoryList.push({
            _id: categoryList._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        });
    }

    return categoryList;
}

router.post("/category/create", requireSignin , adminMiddleware, (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = Category(categoryObj);

    cat.save().then(category => {
        res.status(200).json({ category })
    }).catch(error => console.log(error))
});

router.get("/category/get", (reqq, res) => {
    Category.find({}).then(categories => {
        const categoryList = createCategories(categories)
        res.status(200).json({ categoryList })
    }).catch(error => console.log(error))
})

module.exports = router;