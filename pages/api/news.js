import dbConnect from "@/database/dbConnect";
import News from "@/database/models/news";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "GET") {
    let { page, pageSize, searchKeyword, slug_name } = req.query;

    if (!page) page = 1;
    if (!pageSize) pageSize = 10;

    var re,
      query = [];
    if (searchKeyword) {
      re = new RegExp(searchKeyword.toLowerCase().trim(), "i");

      query.push({
        $or: [{ title: { $regex: re } }, { description: { $regex: re } }],
      });
    }
    if (slug_name) query.push({ slug_name });

    return await News.find(query.length > 0 ? { $and: query } : {})
      .skip((parseInt(page) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize))
      .then((e) => {
        return res.json({
          success: true,
          news: e,
        });
      })
      .catch((e) => {
        console.log(e);
        return res.json({
          success: false,
          message: "Error in the Server.",
        });
      });
  } else if (req.method == "PATCH") {
  } else if (req.method == "DELETE") {
  } else {
    let slug_name = req.body.title
      .split(" ")
      .map((e) => e.toLocaleLowerCase())
      .join("_");
    return await News.create({ ...req.body, slug_name })
      .then(() =>
        res.json({ success: true, message: "Succesfully Published the News" })
      )
      .catch((e) => {
        console.log(e);
        return res.json({
          success: false,
          message: "Error in the Server.",
        });
      });
  }
}
