ภาพรวมของโปรเจกต์ ระบบสำนวนติดตามคดี (Case Tracking System) ของคุณ มีรายละเอียดโครงสร้างและส่วนประกอบต่าง ๆ ดังนี้ครับ:

1. เทคโนโลยีหลักที่ใช้ (Tech Stack)
Frontend Framework: Next.js 15 (App Router & TypeScript)
Database & Authentication: Supabase (PostgreSQL, Supabase Auth และ Real-time subscription)
Styling & UI Components: Tailwind CSS และ shadcn/ui (Radix UI) ร่วมกับ Lucide Icons และการแจ้งเตือนด้วย Sonner
Data Management: จัดการข้อมูลฝั่งเซิร์ฟเวอร์ด้วย Next.js Server Actions และจัดทำตารางด้วย TanStack Table ใน 
data-table.tsx

2. โครงสร้างฐานข้อมูล (Database Schema)
ระบบมีการใช้งานตารางหลัก 2 ตารางใน Supabase:
cases (ข้อมูลสำนวนคดี):
blackno (หมายเลขอท.ดำ)
plaintiff (โจทก์)
accused (จำเลย)
timeat (เวลาเริ่มต้น)
typereq (ประเภทคำขอ)
namereq (ชื่อผู้ขอ)
department (กลุ่มงาน)
remarks (ขั้นตอนการดำเนินการ / รายละเอียดเพิ่มเติม)
statuswrk (สถานะการดำเนินงาน: สีเหลือง = อยู่ระหว่างตรวจสอบเอกสาร, สีส้ม = กำลังดำเนินการ, สีเขียว = ดำเนินการเสร็จสิ้น)
info-notice (ประกาศประชาสัมพันธ์):
desc (รายละเอียดประกาศสำหรับนำไปแสดงผลเป็นตัวอักษรวิ่งด้านล่างของหน้าจอ Dashboard)

3. เส้นทางและหน้าแสดงผลหลัก (Routes & Layouts)
หน้าเข้าสู่ระบบ (Login): 
app/page.tsx
 เป็นหน้าแรกของเว็บที่จะเรียกใช้งาน 
LoginForm
 เพื่อทำการตรวจสอบสิทธิ์ของผู้ใช้งานผ่าน Supabase Auth
หน้าแสดงผล Dashboard (Real-time): 
app/dashboard/page.tsx
แสดงตารางข้อมูลคดีผ่าน 
RealtimeCases
 ซึ่งจะทำการ Subscribe กับ Supabase Real-time เพื่ออัปเดตข้อมูลบนหน้าจอทันทีเมื่อเกิดการเพิ่ม แก้ไข หรือลบข้อมูลในฐานข้อมูล
ด้านล่างมีแถบตัวอักษรวิ่งดึงข้อมูลประกาศจากตาราง info-notice ผ่าน 
ScrollText
หน้าจัดการข้อมูลสำนวนคดี (Admin/Staff Forms): อยู่ภายใต้โฟลเดอร์ 
app/form
แสดงรายการคดี: 
app/form/view/page.tsx
 แสดงตารางคดีทั้งหมดพร้อมปุ่มให้เจ้าหน้าที่แก้ไข/ลบข้อมูล หรืออัปเดตสถานะคดีอย่างรวดเร็ว
เพิ่มคดีใหม่: 
app/form/create/page.tsx
 หน้าฟอร์มสำหรับกรอกข้อมูลเพื่อบันทึกคดีใหม่เข้าสู่ระบบ
แก้ไขคดี: 
app/form/edit/[id]/page.tsx
 หน้าฟอร์มสำหรับอัปเดตข้อมูลรายละเอียดคดีเดิม
 
4. ส่วนการจัดการข้อมูลหลังบ้าน (Server Actions ใน /app/action)
โปรเจกต์นี้ใช้ Server Actions ในการติดต่อกับ Supabase เพื่อความปลอดภัยสูงสุด:
insertForm
 — บันทึกสำนวนคดีใหม่
getCases
 — ดึงข้อมูลคดีทั้งหมดมาแสดง
updateCase
 — แก้ไขรายละเอียดข้อมูลคดี
updateStatus
 — อัปเดตสถานะงาน (statuswrk) ของคดี
deleteCase
 — ลบข้อมูลคดีเดี่ยว
deleteCaseAll
 — ลบข้อมูลคดีทั้งหมดในระบบ
getInfoNotices
 — ดึงข้อมูลประกาศประชาสัมพันธ์

5. ความปลอดภัยและการเข้าถึง (Security & Middleware)
มีระบบตรวจสอบสิทธิ์และเซสชันของผู้ใช้ที่บริเวณ Middleware ผ่านไฟล์ 
proxy.ts
 เพื่อตรวจว่าผู้ใช้ลงชื่อเข้าใช้งานหรือยัง หากยังไม่ได้ Login ระบบจะทำการ Redirect ไปที่หน้า /auth/login ทันทีเมื่อพยายามเข้าถึงหน้าที่ต้องได้รับการป้องกัน