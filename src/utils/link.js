import navigation from "@/utils/navigation";

export default class Link {
    static handel(link) {
        switch (link.action) {
            case "portal":
                return navigation.navigate("index/index");
            case "goods":
                return navigation.navigate("goods/detail", { id: link.param.id });
            case "page":
                return navigation.navigate("page/detail", { id: link.param.id });
            case "category_page":
                return navigation.navigate("categoryPage/detail", { id: link.param.id });
            case "url":
                return navigation.navigate('webView', {
                    url: link.param.url
                })
            case "goods_category":
                return navigation.navigate("search/result", { category_id: link.param.id });
            case "brand":
                return navigation.navigate("search/result", { brand_ids: JSON.stringify([link.param.id]) });
            case "member_card_list":
                return navigation.navigate("card/buy");
            case "do_not_jump":
                break
            default:
                break
        }
    }
}
