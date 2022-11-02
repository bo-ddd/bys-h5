import { useRouter, useRoute, } from 'vue-router';
import { ref, type Ref } from 'vue';
export default function () {
    let tabbar = [
        {
            id: 1,
            title: "招聘会",
            iconUrl: "icon-jobfairs.png",
            activeUrl: "icon-jobfairs_hover.png",
            navigator: "jobfairs"
        },
        {
            id: 2,
            title: "职位推荐",
            iconUrl: "icon-position.png",
            activeUrl: "icon-position_hover.png",
            navigator: "position"
        },
        {
            id: 3,
            title: "消息",
            iconUrl: "icon-news.png",
            activeUrl: "icon-news_hover.png",
            navigator: "news"
        },
        {
            id: 4,
            title: "我的",
            iconUrl: "icon-mine.png",
            activeUrl: "icon-mine_hover.png",
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

