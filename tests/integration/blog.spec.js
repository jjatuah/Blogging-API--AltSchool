const request = require('supertest')
const { connect } = require('../../dbConnect')
const app = require('../../index');
const BlogSchema = require('../../models/blog.model');
const { default: mongoose } = require('mongoose');


describe('Testing the Blog Route for logged-in and and not logged-in users', () => {#
  let idText;

  beforeAll(async () => {
      await connect('mongodb://localhost:27017/testDatabase')


      let testBlog = await BlogSchema.create({
        title: "testing blog",
        description: "test blog",
        tags: ["test", "blog"],
        author: "tobechukwu Augustina",
        state: "published",
        reading_time: 1,
        body: " Random text for primarily for testing purposes"
      })

      idText = testBlog._id.valueOf();

      console.log(idText);
  })

  // afterEach(async () => {
  //     await conn.cleanup()
  // })

  afterAll(async () => {
    await BlogSchema.remove({})
    await mongoose.connection.close()
  })


    // it('testing the home route', async () => {
    //     const response = await request(app).get('/blog').set('content-type', 'application/json')
    //     expect(response.status).toBe(200)
    //     expect(response.body.status).toEqual(true)
    //     expect(response.body.i).toEqual("Key information about this API.")
    //     expect(response.body.ii).toEqual("use /blog to view all published blogs")
    //     expect(response.body.iii).toEqual("Login or signup (using /login or /signup) to be able create and manage your blog as an author on /authorblog route.")
    // })
});
