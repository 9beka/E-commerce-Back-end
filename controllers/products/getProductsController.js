import Product from "../../models/Product.js";
export const getProductsController = async (req, res) => {
  const pageSize = req.query.pageSize || 3;
  const searchQuery = req.query.search || "";
  const usePagination = req.query.pagination !== "NO";

  const query = {};
  console.log(usePagination, req.query.pagination, req.query.page);
  if (searchQuery) query.searchQuery = searchQuery;

  const page = parseInt(req.query.page) || 1;
  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

    res.status(200).send(
      usePagination
        ? {
            products,
            page,
            pages: Math.ceil(total / pageSize),
            total,
          }
        : { products, total }
    )
 };
 