import { useRouter, useRoute, } from 'vue-router';
import { ref, type Ref } from 'vue';
export default function () {
    let tabbar = [
        {
            id: 1,
            title: "招聘会",
            iconUrl: "icon-home.png",
            activeUrl: "icon-home_hover.png",
            navigator: "jobfairs"
        },
        {
            id: 2,
            title: "职位推荐",
            iconUrl: "icon-classification.png",
            activeUrl: "icon-classification_hover.png",
            navigator: "position"
        },
        {
            id: 3,
            title: "消息",
            iconUrl: "icon-shoppingcar.png",
            activeUrl: "icon-shoppingcar_hover.png",
            navigator: "news"
        },
        {
            id: 4,
            title: "我的",
            iconUrl: "icon-my.png",
            activeUrl: "icon-my_hover.png",
            navigator: "mine"
        }
    ];

    const router = useRouter();
    const route = useRoute();
    let select = ref(route.name) as Ref<string>;

    const nav = function (name: string): void {
        select.value = name;
        router.push(name)
    };

    return { tabbar, select, nav }
}

