const Course = require(__basedir + "/models/course").model;
const SubCategory = require(__basedir + "/models/subCategory").model;
const MainCategory = require("../../models/category").model;

// const fullTextSearch = async (key, catName, page, limit, sort) => {
//   let paginates = [];
//   if (!key) {
//     key = "";
//   }

//   if (!catName) {
//     catName = "";
//   }

//   if (!sort || sort >= 0) {
//     sort = 1;
//   }
//   else sort = -1;

//   try {
//     const options = {
//       page,
//       limit,      
//       // projection: { score: { $meta: "textScore" } },
//       // sort: { score: { $meta: "textScore" } },
//     };

//     if (catName) {
//       const foundCat = await SubCategory.findOne({ name: catName }).lean();

//       if (foundCat) {
//         const query = {
//           $and: [{ $text: { $search: key } }, { subCategory: foundCat._id }],
//         };

//         paginates = await new Promise((resolve, reject) => {
//           Course.paginate(query, options, (err, result) => {
//             if (err) {
//               reject(err);
//             }
//             resolve(result);
//           });
//         });
//       }
//     } else {
//       // find with only keyword
//       // console.log("DEBUG");
//       const query = { $text: { $search: key } };
//       paginates = await new Promise((resolve, reject) => {
//         Course.paginate(query, options, (err, result) => {
//           if (err) {
//             reject(err);
//           }
//           resolve(result);
//         });
//       });                
//     }

//     paginates.docs = await Course.populate(paginates.docs, [
//       {
//         path: "lecturer",
//         model: "Lecturer",
//       },
//       {
//         path: "category",
//         model: "MainCategory",
//       },
//       {
//         path: "subCategory",
//         model: "SubCategory",
//       },
//     ]); 
//   } catch (err) {
//     console.log(err);
//   } finally {
//     return paginates;
//   }
// };



const fullTextSearch = async (key, catName, page, limit, sortBy) => {
  let paginates = [];
  let aggregate;
  if (!key) {
    key = "";
  }

  if (!catName) {
    catName = "";
  }

  try {
    const options = {
      page,
      limit,
      // projection: { score: { $meta: "textScore" } },
      // sort: { score: { $meta: "textScore" } },
    };

    if (!catName) {
      // find with only keyword
      // console.log("DEBUG");
      console.log(key);
      let agg = [
        {
          $match: {
            $text: {
              $search: key,
            },
          },
        },
        {
          $addFields: {
            avgRate: {
              $avg: "$rates.score",
            },
          },
        },
        // {
        //   $sort: {
        //     _id: 1,
        //   },
        // },
      ];

      if (sortBy && (sortBy === "rate" || sortBy === "price")) {
        if (sortBy === "rate") {
          agg.push(            
            {
              $sort: {
                avgRate: -1,
                _id:1
              },
            }
          );
        } else {
          agg.push({
            $sort: {
              price: 1,
              _id:1
            },
          });
        }
      }

      console.log(agg);

      aggregate = Course.aggregate(agg);
    } else {
      const foundCat = await SubCategory.findOne({ name: catName }).lean();      

      if (foundCat) {
        let agg = [
          {
            $match: {
              $and: [
                {
                  $text: {
                    $search: key,
                  },
                },
                {
                  subCategory: foundCat._id,
                },
              ],
            },
          },
          {
            $addFields: {
              avgRate: {
                $avg: "$rates.score",
              },
            },
          },
          // {
          //   $sort: {
          //     _id: 1,
          //   },
          // },
        ];

        if (sortBy && (sortBy === "rate" || sortBy === "price")) {
          if (sortBy === "rate") {
            agg.push(              
              {
                $sort: {
                  avgRate: -1,
                  _id:1
                },
              }
            );
          } else {
            agg.push({
              $sort: {
                price: 1,
                _id:1
              },
            });
          }
        }
        aggregate = Course.aggregate(agg);
      }
    }    

    paginates = await new Promise((resolve, reject) => {
      Course.aggregatePaginate(aggregate, options, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });

    paginates.docs = await Course.populate(paginates.docs, [
      {
        path: "lecturer",
        model: "Lecturer",
        options: { withDeleted: true }
      },
      {
        path: "category",
        model: "MainCategory",
        options: { withDeleted: true }
      },
      {
        path: "subCategory",
        model: "SubCategory",
        options: { withDeleted: true }
      },
    ]);


    paginates.docs.forEach((doc) => {console.log(doc.title);});
    
    // console.log(paginates.docs);
    // console.log(paginates.sortBy);
  } catch (err) {
    console.log(err);
  } finally {
    return paginates;
  }
};

module.exports = fullTextSearch;
