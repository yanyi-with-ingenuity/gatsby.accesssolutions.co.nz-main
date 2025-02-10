import data from "../../../data/products.json"

export default function handler(req, res) {

  const category_id = "7"

   let get_section = data.filter( entry => {
      return (
         category_id === entry.category
      )
   })

   let telehandlers_diesel = get_section.filter( entry => {
      let sub_category = 'telehandlers_diesel'
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
            "category":"Call 0800 653 343 to discuss",
            "products": telehandlers_diesel
         },
         {
            "category":"your specific requirements",
            "products": telehandlers_diesel
         },
      ]
    }
  )
}
