import data from "../../../data/products.json"

export default function handler(req, res) {

  const category_id = "6"

   let get_section = data.filter( entry => {
      return (
         category_id === entry.category
      )
   })

   let spider_booms_hybrid = get_section.filter( entry => {
      let sub_category = 'spider_booms_hybrid'
      return (
         sub_category === entry.subcategory_name
      )
   })

   let crawler_booms_diesel = get_section.filter( entry => {
      let sub_category = 'crawler_booms_diesel'
      return (
         sub_category === entry.subcategory_name
      )
   })

   let rail_booms_hybrid = get_section.filter( entry => {
      let sub_category = 'rail_booms_hybrid'
      return (
         sub_category === entry.subcategory_name
      )
   })

  res.status(200).json(
    {
      "status":true,
      "message":"Successfully fetched",
      "data":[
         {
            "category":"Spider Booms - Hybrid",
            "products": spider_booms_hybrid
         },
         {
            "category":"Crawler Booms - Diesel",
            "products": crawler_booms_diesel
         },
         {
            "category":"Rail Booms - Hybrid",
            "products": rail_booms_hybrid
         },
      ]
    }
  )
}