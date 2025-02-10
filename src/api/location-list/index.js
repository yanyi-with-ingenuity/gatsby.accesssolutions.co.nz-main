//import data from "../../data/locations.json"

export default function handler(req, res) {

    res.status(200).json(
        {
            status: true,
            message: "successfully fetched",
            data: {
                content: "<p><strong>Access Solutions<\/strong> is a New Zealand company, proudly owned and operated by New Zealanders with specialist Access, Aluminium Scaffold &amp; Forklifts available for sale or hire from:<br><strong>Auckland | Hautapu | Christchurch.<\/strong><\/p>\t<p>With many years experience in the industry, the Access Solutions team is committed to supplying only quality New Zealand New products that are at the leading edge of industry productivity and safety standards. With over 900 access machines &amp;&nbsp;forklifts, we'll have the right machine for your job.....<\/p>\n<p>As an aluminium manufacturing company that supplies its own scaffolding products, we also have a full scaffold service with our team of scaffolders.<\/p>",
                locations: [
                    {
                        id: 1,
                        name: "Auckland",
                        description: "<ul>\n<li>\n<i class=\"fa fa-map-marker\" aria-hidden=\"true\"><\/i>\n<address><strong>Auckland Depot: 100 Leonard Road, Mt Wellington, Auckland, 1060<\/strong><\/address>\n<\/li>\n<li>\n<i class=\"fa fa-phone\" aria-hidden=\"true\"><\/i>\n<span><a href=\"tel:095794221\">09 579 4221<\/a> or <a href=\"tel:0800653343\">0800 653 343<\/a><\/span>\n<\/li>\n<li>\n<i class=\"fa fa-envelope\" aria-hidden=\"true\"><\/i>\n<span><a href=\"mailto:info@accesssolutions.co.nz\">info@accesssolutions.co.nz<\/a><\/span>\n<\/li>\n<\/ul>",
                        map_url: "https:\/\/www.google.co.nz\/maps\/dir\/\/Access+Solutions+Ltd+Leonard+Road,+Mount+Wellington,+Auckland\/@-36.9064827,174.7537216,12z\/data=!4m8!4m7!1m0!1m5!1m1!1s0x6d0d49229bbcdcb9:0xaee2e16ffcdd35b8!2m2!1d174.8237618!2d-36.9065033",
                        image_url: "https:\/\/www.accesssolutions.co.nz\/images\/uploads\/auckland.jpg",
                        status: "A",
                        created_at: "2017-11-09 06:20:44",
                        updated_at: "2017-11-09 06:20:44",
                        latitude: "-36.906503",
                        longitude: "174.823762",
                        address: "<strong>Auckland Depot: 100 Leonard Road, Mt Wellington, Auckland, 1060<\/strong>",
                        phone: "09 579 4221 or 0800 653 343",
                        mail: "info@accesssolutions.co.nz"
                    },
                    {
                        id: 2,
                        name: "Hautapu",
                        description: "<ul>\r\n<li>\r\n<i class=\"fa fa-map-marker\" aria-hidden=\"true\"><\/i>\r\n<address><strong>Hautapu Depot: 280a Peake Road, Hautapu, Cambridge <\/strong><\/address>\r\n<\/li>\r\n<li>\r\n<i class=\"fa fa-phone\" aria-hidden=\"true\"><\/i>\r\n<span><a href=\"tel:0800653343\">0800 653 343<\/a><\/span>\r\n<\/li>\r\n<li>\r\n<i class=\"fa fa-envelope\" aria-hidden=\"true\"><\/i>\r\n<span><a href=\"mailto:info@accesssolutions.co.nz\">info@accesssolutions.co.nz<\/a><\/span>\r\n<\/li>\r\n<\/ul>",
                        map_url: "https://www.google.com/maps/dir//280a+Peake+Rd,+Hautapu+Cambridge/@-37.8624604,175.4392927,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x6d3f532518dac745:0x4715eb434add3384!2m2!1d174.82408!2d-41.1526348!3e0",
                        image_url: "https:\/\/www.accesssolutions.co.nz\/images\/uploads\/wellington.jpg",
                        status: "A",
                        created_at: "2017-11-09 06:21:47",
                        updated_at: "2017-11-09 06:21:47",
                        latitude: "-37.8624604",
                        longitude: "175.4392927",
                        address: "<strong>Hautapu Depot: 280a Peake Road, Hautapu, Cambridge <\/strong>",
                        phone: "0800 653 343",
                        mail: "info@accesssolutions.co.nz"
                    },
                    {
                        id: 3,
                        name: "Christchurch",
                        description: "<ul>\n<li>\n<i class=\"fa fa-map-marker\" aria-hidden=\"true\"><\/i>\n<address><strong>Christchurch Depot: 28 Nga Mahi Road, Sockburn, Christchurch<\/strong><\/address>\n<\/li>\n<li>\n<i class=\"fa fa-phone\" aria-hidden=\"true\"><\/i>\n<span><a href=\"tel:033436103 \">03 343 6103<\/a> or <a href=\"tel:0800653343\">0800 653 343<\/a><\/span>\n<\/li>\n<li>\n<i class=\"fa fa-envelope\" aria-hidden=\"true\"><\/i>\n<span><a href=\"mailto:info@accesssolutions.co.nz\">info@accesssolutions.co.nz<\/a><\/span>\n<\/li>\n<\/ul>",
                        map_url: "https:\/\/www.google.co.nz\/maps\/dir\/\/Access+Solutions+Christchurch+Nga+Mahi+Road,+Sockburn,+Christchurch\/@-43.5401956,172.4852102,12z\/data=!4m8!4m7!1m0!1m5!1m1!1s0x6d31f551ead35dd5:0x7300047f777adcdf!2m2!1d172.5552502!2d-43.540217",
                        image_url: "https:\/\/www.accesssolutions.co.nz\/images\/uploads\/christchurch.jpg",
                        status: "A",
                        created_at: "2017-11-09 06:22:36",
                        updated_at: "2017-11-09 06:22:36",
                        latitude: "-43.540217",
                        longitude: "172.55525",
                        address: "<strong>Christchurch Depot: 28 Nga Mahi Road, Sockburn, Christchurch<\/strong>",
                        phone: "03 343 6103 or 0800 653 343",
                        mail: "info@accesssolutions.co.nz"
                    }
                ]
            }
        }
    )
}