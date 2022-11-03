const express = require("express");
const blogModel = require("../models/blog.model");

const blogsRoute = express.Router(); 



blogsRoute.get('/', async (req, res) => {

  const {author, title, state, tags, read_count, reading_time, time, page = 1, limit = 20} = req.query;

  let readCountNum;
  let readTimeNum;
  let timeNum;

  read_count === "asc" ? readCountNum = 1 : readCountNum = -1;
  reading_time === "asc" ? readTimeNum = 1 : readTimeNum = -1;
  time === "asc" ? timeNum = 1 : timeNum = -1;

  try {
    let blogs;
    if (author) {
      blogs = await blogModel.find({ author }).limit(limit * 1).skip((page - 1) * limit);
    } else if (title) {
      blogs = await blogModel.find({ title }).limit(limit * 1).skip((page - 1) * limit);
    }else if (state) {
      blogs = await blogModel.find({ state }).limit(limit * 1).skip((page - 1) * limit);
    } else if (tags) {
      blogs = await blogModel.find({ tags: {
        $in: [tags]
      } }).limit(limit * 1).skip((page - 1) * limit);
    } else if (read_count) {
      blogs = await blogModel.find({}).sort({
        read_count : readCountNum
      }).limit(limit * 1).skip((page - 1) * limit);
    } else if (reading_time) {
      blogs = await blogModel.find({}).sort({
        reading_time : readTimeNum
      }).limit(limit * 1).skip((page - 1) * limit);
    } else if (time) {
      blogs = await blogModel.find({}).sort({
        timestamps : timeNum
      }).limit(limit * 1).skip((page - 1) * limit);
    } else {
      blogs = await blogModel.find().limit(limit * 1).skip((page - 1) * limit);
    }
    res.status(200).json({total_blogs: blogs.length, blogs});
  } catch (err) {
     res.status(500).json({ status: false, message: err });

  }
})


blogRoute.get('/:blogId', async (req, res) => {
    const { blogId } = req.params;
    
    await blogModel.findById(blogId)
        .then((blog)=> {
            if(!blog) {
                return res.status(404).json({ status: false, blog : null })
            }

            blog.read_count++

            blog.save();

            const { author, ...result } = blog;
            const blogResult = result._doc
            return res.json({ status: true, witten_by : author, blogResult }) 
        }).catch((err) => {
            return res.json({ status: false, message: err })
    }) 
})

module.exports = blogsRoute;