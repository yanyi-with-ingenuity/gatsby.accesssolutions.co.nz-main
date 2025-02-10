import data from "../../../data/telehandlers.json"

export default function handler(req, res) {

    let section = data.title
    let image_url = `https://www.accesssolutions.co.nz${data.image}`
    let template = `<!DOCTYPE html><head><meta charSet=\"utf-8\"\/><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"\/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"\/><link rel=\"stylesheet\" href=\"https:\/\/www.accesssolutions.co.nz\/\/css\/style.css\" \/><link rel=\"preconnect\" href=\"https:\/\/fonts.googleapis.com\" \/><link rel=\"preconnect\" href=\"https:\/\/fonts.gstatic.com\" crossorigin \/><link href=\"https:\/\/fonts.googleapis.com\/css2?family=Barlow:wght@400;700&family=Roboto:wght@400;700&display=swap\" rel=\"stylesheet\" \/><\/head><body class=\"grey\"><div class=\"page grey\"><div class=\"layout banner_bg grey\"><div class=\"banner__container relative\"><div class=\"absolute app_img\"><img src=\"${image_url}\" alt=\"about\" style=\"object-fit:cover;width:100%;height:100%,display:block\" \/><\/div><div class=\"banner relative\"><h2>${section}<\/h2><\/div><\/div><\/div><main class=\"layout entry grey\"><div class=\"entry__container\"><div class=\"entry__flex flex__space-around\"><article class=\"article text\">${data.html}<\/article><\/div><\/div><\/main><\/div><body\/><\/html>`
    
    res.status(200).json(
        {
            status: true,
            message: "successfully fetched",
            data : {
                id: `6`,
                title: data.title,
                image: image_url,
                content: template,
                status: "A"
            }
        }
    )

}