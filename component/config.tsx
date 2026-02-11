export type ConfigType = {
    memoryImage: string
    memoryText: string
    reassuranceText: string[]
    reasons: ReasonType[]
    reasonText: string
    finalStageImg: string
    finalStageText: string
}

type ReasonType = {
    id: number,
    text: string,
    image: string
}

export const CONFIG: ConfigType = {
    memoryImage: "/1.jpg", // ใส่ / นำหน้าชื่อไฟล์ใน public
    memoryText: "ข้อความ 1. XXXXXXX",
    reassuranceText: [
        "ข้อความ 2.1 XXXXXXXX",
        "ข้อความ 2.2 XXXXXXXX",
        "ข้อความ 2.3 XXXXXXXX",
        "ข้อความ 2.4 XXXXXXXX",
    ],
    reasons: [
        {
            id: 1,
            text: "ข้อความ 3.1 XXXXX",
            image: "/3-1.jpg"
        },
        {
            id: 2,
            text: "ข้อความ 3.2 XXXXX",
            image: "/3-2.jpg"
        },
        {
            id: 3,
            text: "ข้อความ 3.3 XXXXX",
            image: "/3-3.jpg"
        },
        {
            id: 4,
            text: "ข้อความ 3.4 XXXXXX",
            image: "/3-4.jpg"
        },
    ],
    reasonText: "ข้อความ 3",
    finalStageImg: "4.gif",
    finalStageText: "ข้อความ 4. XXXXXXX"
};

// export const AlterConfig: ConfigType = {
//     memoryImage: "/intro.jpg", // ใส่ / นำหน้าชื่อไฟล์ใน public
//     memoryText: "คนอะไรน่ารักจัง",
//     reassuranceText: [
//         "เธอน่ารักจัง",
//         "ยิ้มแล้วน่ารัก",
//     ],
//     reasons: [
//         {
//             id: 1,
//             text: "",
//             image: "/reason-1.jpg"
//         },
//         {
//             id: 2,
//             text: "",
//             image: "/reason-2.jpg"
//         },
//         {
//             id: 3,
//             text: "",
//             image: "/reason-3.jpg"
//         },
//         {
//             id: 4,
//             text: "",
//             image: "/reason-4.jpg"
//         },
//     ],
//     reasonText: "รักเธอนะ",
//     finalStageImg: "/final.jpg"
// };