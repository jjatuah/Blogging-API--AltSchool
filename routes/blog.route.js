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


    // const {total_price, order, created_at} = req.query;
    // let totNum;
    // let orderNum;
    // let creNum;
    // let page = 1;
    // let maxi = 2;
    // total_price === "asc" ? totNum = 1 : totNum = -1;
    // order === "asc" ? orderNum = 1 : orderNum = -1;
    // created_at === "asc" ? creNum = 1 : creNum = -1;

    // await orderModel.find().sort({total_price: totNum, order: orderNum, created_at: creNum }).skip((page - 1) * maxi).limit(maxi)
    //     .then((order) => {
    //         return res.json({ status: true, order })
    //     }).catch((err) => {
    //         return res.json({ status: false, message: err })
    //     })
})


// blogRoute.get('/:orderId', async (req, res) => {
//     const { orderId } = req.params;
    
//     await orderModel.findById(orderId)
//         .then((order)=> {
//             if(!order) {
//                 return res.status(404).json({ status: false, order: null })
//             }
//             return res.json({ status: true, order }) 
//         }).catch((err) => {
//             return res.json({ status: false, message: err })
//     }) 
// })

// blogRoute.patch('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { state } = req.body.order;

//     await orderModel.findById(id)
//         .then((order) => {
//             if (!order) {
//                 return res.status(404).json({ status: false, order: null })
//             }

//             if (state < order.state) {
//                 return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
//             }

//             order.state = state;

//             order.save();

//             return res.json({ status: true, order })
//         }).catch((err) => {
//             return res.json({ status: false, message: err })
//     })
// })

// blogRoute.delete('/:id', async (req, res) => {
//     const { id } = req.params;

//     await orderModel.deleteOne({ _id: id})
//         .then((order) => {
//             return res.json({ status: true, order, message: "Order deleted successfully" })
//         }).catch((err) => {
//           return res.json({ status: false, message: err })
//     })
// })

module.exports = blogRoute;