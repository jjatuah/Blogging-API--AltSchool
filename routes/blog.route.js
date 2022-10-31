const express = require("express");
const blogModel = require("../models/blog.model");

const blogRoute = express.Router();

const readTimeFunction = (text) => {
  const wpm = 250;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
} 

blogRoute.post('/', async (req, res) => {
    const body = req.body;
    const blogArticle = body.body;
    let reading_time;

    blogArticle ? reading_time = readTimeFunction(blogArticle) : res.json({ status: false, message: "Blog body can't be empty" });

    console.log(reading_time);

    const blogDetails = { 
        title: body.title,
        description: body.description,
        tags: body.tags,
        author: body.author,
        state: body.state,
        reading_time,
        body: blogArticle
    }

    await blogModel.create(blogDetails)
        .then((blog) => {
            return res.json({ status: true, blog })
        }).catch((err) => {
            return res.json({ status: false, message: err })
    })
})




module.exports = blogRoute;