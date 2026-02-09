"use server"; // บรรทัดนี้สำคัญมาก! บอกว่าเป็น Server Code

import { CONFIG, AlterConfig } from "@/component/config";

// กำหนดรหัสลับที่นี่ (หรือจะดึงจาก process.env ก็ได้)
const TRUE_CODE = "515690";

export async function verifyAndGetConfig(passcode: string) {
    // จำลองความหน่วงนิดนึง (กันคนยิงรัวๆ และให้ดูเหมือนระบบกำลังคิด)
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (passcode === TRUE_CODE) {
        // ถ้ารหัสถูก -> ส่งของจริงกลับไป
        return { success: true, data: CONFIG };
    } else {
        // ถ้ารหัสผิด -> ส่งของปลอมกลับไป (หรือจะไม่ส่งอะไรเลยก็ได้)
        return { success: false, data: AlterConfig };
    }
}