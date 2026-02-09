export type ConfigType = {
    memoryImage: string
    memoryText: string
    reassuranceText: string[]
    reasons: ReasonType[]
    reasonText: string
    finalStageImg: string
}

type ReasonType = {
    id: number,
    text: string,
    image: string
}

export const CONFIG: ConfigType = {
    memoryImage: "/us.jpg", // ใส่ / นำหน้าชื่อไฟล์ใน public
    memoryText: "วันของเรา :)",
    reassuranceText: [
        "ในวันที่เธอมีความสุข",
        "ในวันที่เธอมีความทุกข์",
        "หรือในวันที่เธอไม่สบายใจ",
        "เราพร้อมรับฟังและจะอยู่ข้างเธอเสมอ ❤️",
    ],
    reasons: [
        {
            id: 1,
            text: "ในตอนเธอยิ้มให้",
            image: "/smile-2.jpg"
        },
        {
            id: 2,
            text: "ในตอนที่เที่ยวด้วยกัน",
            image: "/travel.jpg"
        },
        {
            id: 3,
            text: "ในตอนที่กินของอร่อย",
            image: "/yummy.jpg"
        },
        {
            id: 4,
            text: "และทุกๆตอน",
            image: "/all-time.jpg"
        },
    ],
    reasonText: "เราจะอยู่ข้างเธอเสมอ",
    finalStageImg: "hand.jpg"
};

export const AlterConfig: ConfigType = {
    memoryImage: "/intro.jpg", // ใส่ / นำหน้าชื่อไฟล์ใน public
    memoryText: "คนอะไรน่ารักจัง",
    reassuranceText: [
        "เธอน่ารักจัง",
        "ยิ้มแล้วน่ารัก",
    ],
    reasons: [
        {
            id: 1,
            text: "",
            image: "/reason-1.jpg"
        },
        {
            id: 2,
            text: "",
            image: "/reason-2.jpg"
        },
        {
            id: 3,
            text: "",
            image: "/reason-3.jpg"
        },
        {
            id: 4,
            text: "",
            image: "/reason-4.jpg"
        },
    ],
    reasonText: "รักเธอนะ",
    finalStageImg: "/final.jpg"
};