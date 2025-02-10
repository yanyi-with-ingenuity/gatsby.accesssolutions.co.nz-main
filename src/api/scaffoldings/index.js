import data from "../../data/scaffolding.json"

export default function handler(req, res) {

    let template = `<!DOCTYPE html><head><meta charSet=\"utf-8\"\/><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"\/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"\/><link rel=\"stylesheet\" href=\"https:\/\/www.accesssolutions.co.nz\/\/css\/style.css\" \/><link rel=\"preconnect\" href=\"https:\/\/fonts.googleapis.com\" \/><link rel=\"preconnect\" href=\"https:\/\/fonts.gstatic.com\" crossorigin \/><link href=\"https:\/\/fonts.googleapis.com\/css2?family=Barlow:wght@400;700&family=Roboto:wght@400;700&display=swap\" rel=\"stylesheet\" \/><\/head><body class=\"grey\"><div class=\"page grey\"><div class=\"layout banner_bg grey\"><div class=\"banner__container relative\"><div class=\"absolute app_img\"><img src=\"https://www.accesssolutions.co.nz${data.scaffolding.image}\" alt=\"${data.scaffolding.title}\" style=\"object-fit:cover;width:100%;height:100%,display:block\" \/><\/div><div class=\"banner relative\"><h2>${data.scaffolding.title}<\/h2><\/div><\/div><\/div><main class=\"layout entry grey\"><div class=\"entry__container\"><div class=\"entry__flex flex__space-around\"><article class=\"article text\">${data.scaffolding.html}<\/article><\/div><\/div><\/main><\/div><div class=\"page grey\"><div class=\"layout banner_bg grey\"><div class=\"banner__container relative\"><div class=\"absolute app_img\"><img src=\"https://www.accesssolutions.co.nz${data.mobile_scaffolding.image}\" alt=\"${data.mobile_scaffolding.title}\" style=\"object-fit:cover;width:100%;height:100%,display:block\" \/><\/div><div class=\"banner relative\"><h2>${data.mobile_scaffolding.title}<\/h2><\/div><\/div><\/div><div class=\"layout entry grey\"><div class=\"entry__container\"><div class=\"entry__flex flex__space-around\"><article class=\"article text\">${data.mobile_scaffolding.html}<\/article><\/div><\/div><\/div><\/div><div class=\"page grey\"><div class=\"layout banner_bg grey\"><div class=\"banner__container relative\"><div class=\"absolute app_img\"><img src=\"https://www.accesssolutions.co.nz${data.face_scaffolding.image}\" alt=\"${data.face_scaffolding.title}\" style=\"object-fit:cover;width:100%;height:100%,display:block\" \/><\/div><div class=\"banner relative\"><h2>${data.face_scaffolding.title}<\/h2><\/div><\/div><\/div><div class=\"layout entry grey\"><div class=\"entry__container\"><div class=\"entry__flex flex__space-around\"><article class=\"article text\">${data.face_scaffolding.html}<\/article><\/div><\/div><\/div><\/div><div class=\"page grey\"><div class=\"layout banner_bg grey\"><div class=\"banner__container relative\"><div class=\"absolute app_img\"><img src=\"https://www.accesssolutions.co.nz${data.swinging_stages.image}\" alt=\"${data.swinging_stages.title}\" style=\"object-fit:cover;width:100%;height:100%,display:block\" \/><\/div><div class=\"banner relative\"><h2>${data.swinging_stages.title}<\/h2><\/div><\/div><\/div><div class=\"layout entry grey\"><div class=\"entry__container\"><div class=\"entry__flex flex__space-around\"><article class=\"article text\">${data.swinging_stages.html}<\/article><\/div><\/div><\/div><\/div><body\/><\/html>`
    
    res.status(200).json(
        {
            status: true,
            message: "successfully fetched",
            data: {
                title: data.title,
                content: template
            }
        }
    )

}
