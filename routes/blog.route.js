const express = require("express");
const blogModel = require("../models/blog.model");

const blogRoute = express.Router();

const readTimeFunction = (text) => {
  const wpm = 250;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
} 

// blogRoute.post('/', async (req, res) => {
//     const body = req.body;
//     const blogArticle = body.body;
//     let reading_time;

//     blogArticle ? reading_time = readTimeFunction(blogArticle) : res.json({ status: false, message: "Blog body can't be empty" });

//     const blogDetails = { 
//         title: body.title,
//         description: body.description,
//         tags: body.tags,
//         author: body.author,
//         state: body.state,
//         reading_time,
//         body: blogArticle
//     }

//     await blogModel.create(blogDetails)
//         .then((blog) => {
//             return res.json({ status: true, blog }).status(201)
//         }).catch((err) => {
//             return res.json({ status: false, message: err }).status(403)
//     })
// })


blogRoute.post('/', async (req, res) => {
  try {
        const body = req.body;
        const blogArticle = body.body;
        let reading_time;

        if (blogArticle) {
          reading_time = readTimeFunction(blogArticle)
        }
        // blogArticle ? reading_time = readTimeFunction(blogArticle) : res.json({ status: false, message: "Blog body can't be empty" });
    
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
          return res.json({ status: true, blog }).status(201)
        }).catch((err) => {
          return res.json({ status: false, message: err }).status(403)
        })
    
  } catch (err) {
    res.status(500).json(err);
  }
})



blogRoute.get('/', async (req, res) => {

  const {author, title, tags, read_count, reading_time, time, page = 1, limit = 20} = req.query;

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

blogRoute.patch('/:id', async (req, res) => {

  const blogId = req.params.id;

  try {
    const blog = await blogModel.findById(blogId);
    if (blog.author === req.body.author) {
      try {
        const updatedBlog = await blogModel.findByIdAndUpdate(
          blogId,
          {
            $set: req.body,
          },
          { new: true }
        );

        let updatedReadingTime = readTimeFunction(updatedBlog.body);

        updatedBlog.reading_time = updatedReadingTime;

        updatedBlog.save();

        res.status(200).json(updatedBlog);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your own post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

blogRoute.put('/:id', async (req, res) => {

  const blogId = req.params.id;

  try {
    const blog = await blogModel.findById(blogId);
    if (blog.author === req.body.author) {
      try {
        const updatedBlog = await blogModel.findByIdAndUpdate(
          blogId,
          {
            $set: req.body,
          },
          { new: true }
        );

        let updatedReadingTime = readTimeFunction(updatedBlog.body);

        updatedBlog.reading_time = updatedReadingTime;

        updatedBlog.save();

        res.status(200).json(updatedBlog);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your own post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

blogRoute.delete('/:id', async (req, res) => {

  const blogId = req.params.id;

  try {
    const blog = await blogModel.findById(blogId);
    if (blog.author === req.body.author) {
      try {
        await blog.delete();
        res.status(200).json("Post successfully deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your own post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = blogRoute;