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
    memoryText: "Pair & Meen <3",
    reassuranceText: [
        "ทุกช่วงเวลาที่อยู่ด้วย",
        "คือความทรงจำที่ดีที่สุดเลย",
    ],
    reasons: [
        {
            id: 1,
            text: "แสงไฟสว่าง แต่ก็แพ้คนข้างๆ",
            image: "/3-1.jpg"
        },
        {
            id: 2,
            text: "พร้อมไปทุกที่เลย",
            image: "/3-2.jpg"
        },
        {
            id: 3,
            text: "เป็นพื้นที่ปลอดภัยให้กันนะ :)",
            image: "/3-3.jpg"
        },
        {
            id: 4,
            text: "อยู่ด้วยกันตลอดนะ",
            image: "/3-4.jpg"
        },
    ],
    reasonText: "บันทึกไว้... ว่าเรารักกัน",
    finalStageImg: "4.gif",
    finalStageText: "Happy Valentine's Day"
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