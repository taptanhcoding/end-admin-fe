import { Url } from "next/dist/shared/lib/router/router";

export default function LinkByType({type,to}: {type: string,to: string}):Url {
    let link = ''
    switch (type) {
        case 'products':
            link = `/san-pham/${to}`
            break;
    case 'categories':
            link = `/danh-sach/${to}`
        break;
        default:
            break;
    }
    return link
}