# รายงานสถาปัตยกรรมโซลูชัน

**เรื่อง**: การพัฒนาระบบเบิกจ่ายเงินสดย่อยอัตโนมัติ (Petty Cash Automation)  
**ถึง**: ผู้บริหารฝ่ายการเงินและเทคโนโลยีสารสนเทศ, Doi Tung Brand  
**จาก**: Solution Architect – ผู้เชี่ยวชาญด้าน Finance Automation และ ERP Integration  
**วันที่**: 7 พฤศจิกายน 2568

เอกสารฉบับนี้จัดรูปแบบใหม่เป็น Markdown เพื่อให้อ่านง่ายและผูกโยงกับชุดต้นแบบ (prototypes) ในโฟลเดอร์หลัก ได้แก่ `program-hub.html`, `line-prototype.html`, `dashboard-prototype.html`, `pcard-program-prototype.html`, `pcard-report-prototype.html` รวมถึงคอนโซลบริหาร Prompt ที่ `prompt/admin-prompt-console.html` ซึ่งจำลองสถาปัตยกรรม Agent ที่สนับสนุนกระบวนการอัตโนมัติครบวงจร

---

## 1. บทสรุปสำหรับผู้บริหาร

โครงการ Petty Cash Automation ถูกขับเคลื่อนจากปัญหาเดิมที่เน้น Manual workflow (พนักงานรวบรวมเอกสารกระดาษ ส่งให้การเงิน, การเงินสแกน/อัปโหลด PDF, ตรวจสอบเอง) ส่งผลให้เกิดภาระงานสูง เสี่ยงต่อความผิดพลาด และมีต้นทุนแฝงจากเงินสดคงค้าง เป้าหมายระยะยาวที่สอดคล้องกับการออกแบบต้นแบบทุกไฟล์ คือ:

- **Automate 80%** ของจำนวนรายการทั้งหมด
- **ให้ผลลัพธ์ถูกต้อง 100%** (Outcome Accuracy)
- **ลดเวลาและค่าใช้จ่าย** ทั้งฝั่งพนักงานหน้าร้านและทีมการเงิน

Pain Points หลักถูกยืนยันผ่าน Sprint Questions: 

1. ความไม่เชื่อมั่นใน AI (**Untrust AI**)  
2. การจัดการ Stakeholder และ Workload  
3. ประเด็น Budget/ROI

จากการวิเคราะห์ 3 แนวทางสถาปัตยกรรม (Sketches) และการเทียบกับต้นแบบที่สร้างไว้ ข้อเสนอเชิงกลยุทธ์คือ **Sketch 3 – ใช้แพลตฟอร์มบริหารค่าใช้จ่ายสำเร็จรูป (COTS Expense Platform)** เพราะให้สมดุลสูงสุดระหว่าง Automation, User Trust และ Time-to-Value พร้อมรองรับการต่อยอดด้วย Agentic Prompt Console ที่อยู่ใน prototype `prompt/admin-prompt-console.html` เพื่อบริหารบทบาท AI Assistants ในอนาคต

---

## 2. ภาพรวมกระบวนการปัจจุบัน (As-Is) และข้อจำกัด

### 2.1 User Journey ปัจจุบัน

1. **พนักงานหน้าร้าน**: รวบรวมใบเสร็จจริง, กรอกแบบฟอร์ม (กระดาษ/Excel), ส่งเอกสารให้การเงิน
2. **ฝ่ายการเงิน**: ตรวจสอบเอกสารแบบ Manual, สแกนไฟล์, อัปโหลด PDF เข้าแอปปัจจุบัน (เรียกชื่อภายในว่า “myelly…”) 
3. **ตรรกะแยกเส้นทาง**: ระบบ/ทีมการเงินแยกตามยอด
	- ยอด **> 300 บาท** → ส่งเข้ากระบวนการ **SAP**
	- ยอด **< 300 บาท** → ส่งเข้ากระบวนการ **Treasury**
4. **การจ่ายเงิน**: ดำเนินการตามระบบที่เกี่ยวข้อง (SAP/Treasury)

### 2.2 ข้อจำกัดหลัก (Core Constraints)

- **Bifurcated Backend**: ต้องมี Workflow Engine ที่กำหนดเส้นทาง SAP/Treasury ได้แบบตรวจสอบย้อนกลับ 
- **Untrust AI**: หากระบบถูกมองว่าเป็น “Black Box” ผู้ใช้จะไม่ยอมรับ แม้เทคนิคจะดี 
- **HMW Goals**: ต้องลดภาระงาน ลดความผิดพลาด และลดต้นทุนอย่างวัดผลได้

### 2.3 จุดกำเนิดภาระงานที่แท้จริง

แม้ภาระงานของทีม Finance จะเห็นชัดเจนในขั้นตอนอัปโหลด PDF แต่ “จุดเริ่ม” ที่หน้าร้านเป็นต้นตอหลักของความล่าช้า โซลูชันที่แก้เฉพาะฝั่ง Finance จึงเป็นเพียงการแก้ปลายเหตุ ต้องออกแบบ End-to-End Automation ที่ครอบคลุมพนักงานด้วย (สอดคล้องกับ prototype `line-prototype.html` ที่แสดงประสบการณ์ LINE Bot สำหรับรับใบเสร็จ)

---

## 3. สถาปัตยกรรมตัวเลือก (Solution Sketches)

### Sketch 1 — RPA-Led Augmentation (เสริมกระบวนการเดิมด้วย RPA)

- ใช้ RPA/UiPath ทำงาน Data Entry แทนบุคคล
- โฟลเดอร์เฝ้าระวัง (Watched Folder) สำหรับ PDF → Bot อ่าน → คีย์เข้า myelly/SAP/Treasury ผ่าน UI Automation
- จุดแข็ง: แก้โจทย์ Untrust AI เพราะเป็นกฎแบบ Rule-Based ที่โปร่งใส
- จุดอ่อน: Automate ได้เฉพาะส่วน Data Entry ของ Finance (ต้นทางยัง Manual)

### Sketch 2 — Mobile-First & AI-Driven Policy

- พัฒนา Mobile App ของ Doi Tung เอง + ใช้ AI OCR (Azure/Google) + AI Policy Engine 
- Routing + Integration ผ่าน API Gateway/Microservice ที่พัฒนาใหม่
- จุดแข็ง: End-to-End Automation > 90% 
- จุดอ่อน: TCO สูง, Implementation ยาว (9-18 เดือน), เสี่ยงต่อ Untrust AI เพราะตัดสินใจโดย AI ที่เป็น “กล่องดำ”

### Sketch 3 — COTS Expense Platform (ทางสายกลาง)

- ใช้แพลตฟอร์มสำเร็จรูป เช่น SAP Concur, PEAKflo, FlowAccount ครอบคลุมตั้งแต่ capture → OCR → Policy → Routing → Integration
- เครื่องมืออย่าง `prompt/admin-prompt-console.html` ใช้จำลอง Back Office ที่บริหาร Persona/Prompt ของ Agent เพื่อรองรับ workflow ใหม่
- จุดแข็ง: Automation 80-90% ทันที, Rules Engine โปร่งใส, มี mobile app ให้พนักงานใช้งาน, ตอบโจทย์ Untrust AI
- จุดอ่อน: ต้องเลือกระหว่าง TCO สูงแต่เชื่อม SAP ง่าย (Concur) vs TCO ต่ำแต่ต้องทำ Custom Integration (Local COTS)

การเชื่อมโยงกับต้นแบบใน repo:

| Prototype | สะท้อน Sketch | หมายเหตุ |
|-----------|----------------|----------|
| `program-hub.html` | Narrative Hub | เล่าโจทย์ Problem → Solution → Impact และมีลิงก์ไปทุกเดโม |
| `line-prototype.html` | Sketch 2 & 3 (จุดรับข้อมูล) | ประสบการณ์พนักงานผ่าน LINE Bot |
| `dashboard-prototype.html` | Sketch 1 & 3 | Human-in-the-loop dashboard สำหรับ Finance |
| `pcard-program-prototype.html` | Sketch 3 | ROI Forecast จากการ rollout P-Card และ expense automation |
| `pcard-report-prototype.html` | Sketch 3 | Executive-ready report / SAP journal template |
| `prompt/admin-prompt-console.html` | Sketch 3 | Mockup สำหรับบริหาร Agent Prompt & Instruction |

---

## 4. การวิเคราะห์เชิงเทคนิคและการเงิน

| ประเด็น | Sketch 1: RPA | Sketch 2: Mobile + AI | Sketch 3: COTS |
|----------|---------------|----------------------|-----------------|
| **Automation Potential** | ต่ำ-ปานกลาง (เฉพาะ Finance) | สูงมาก (>90%) | สูง (80-90% Out-of-the-box) |
| **Workload Impact** | ลดเฉพาะ Finance | ลดทั้งพนักงาน + Finance | ลดทั้งระบบ พร้อม Best Practices |
| **TCO / ROI** | ปานกลาง (License & Maintenance) | สูงมาก (ลงทุนสร้าง Product/AI) | ผันแปร (Concur สูง, Local ต่ำ) แต่เริ่มเห็นผลเร็ว |
| **Implementation Time** | 3-6 เดือน | 9-18 เดือน | 3-6 เดือน (Configure + Integrate) |
| **Integration Complexity** | สูง (Fragile UI Automation) | สูงสุด (ต้องสร้าง API Layer) | ปานกลาง-สูง (Concur เชื่อม SAP ง่าย, Local ต้องทำเอง) |
| **User Trust (Untrust AI)** | สูง (Rule-based) | ต่ำ (AI ตัดสินใจ) | สูง (AI เป็น Utility + Rules Engine โปร่งใส) |

หมายเหตุ: ตัวเลขประมาณการ TCO/ROI ใช้อ้างอิงจากตลาดทั่วไป (เช่น ค่า License SAP Concur ~3.6 ล้านบาท/ปี) และประสบการณ์โครงการเทียบเคียงในไทย

---

## 5. ข้อเสนอแนะสุดท้าย

### 5.1 Recommendation

เลือก **Sketch 3 – COTS Expense Platform** เนื่องจากสมดุลระหว่าง Automation, User Trust, และ Time-to-Value ตอบโจทย์เป้าหมายหลักและความกังวลของผู้ใช้งานมากที่สุด พร้อมต่อยอดการสื่อสารผ่าน `program-hub.html` และการควบคุม Agent ผ่าน Prompt Console Mockup เพื่อสร้างความเข้าใจร่วมกัน

### 5.2 ตัวเลือกย่อยภายใน Sketch 3

1. **SAP Concur** (Enterprise COTS)  
	- Pros: มี Connector กับ SAP โดยตรง, Workflow แข็งแรง  
	- Cons: TCO สูง, ต้องพัฒนาส่วนเชื่อม Treasury เอง

2. **PEAKflo / FlowAccount** (Local Thai COTS)  
	- Pros: ต้นทุนต่ำ, รองรับใบกำกับภาษีไทย, UI เข้าใจง่าย  
	- Cons: ต้องพัฒนา Integration กับ SAP/Treasury เองทั้งหมด

### 5.3 Roadmap เชิงกลยุทธ์

1. **Phase 1 – Proof of Concept (4-6 สัปดาห์)**  
	- PoC เปรียบเทียบ SAP Concur vs Local COTS  
	- ทดสอบทั้งฟีเจอร์และประสบการณ์การพัฒนา Integration

2. **Phase 2 – Integration & Configuration (3-4 เดือน)**  
	- ตั้งค่า Workflow Engine แยกเส้นทาง >300 / <300  
	- พัฒนาและทดสอบ Connector (SAP / Treasury)

3. **Phase 3 – Change Management & Pilot (1-2 เดือน)**  
	- ใช้คอนเทนต์จาก `program-hub.html` และ `dashboard-prototype.html` & `prompt/admin-prompt-console.html` ในการสื่อสาร  
	- สร้างทีม “AI Champions” เพื่อจัดการ Untrust AI  
	- Reposition ทีม Finance จาก Data Entry สู่ Review-by-Exception

4. **Phase 4 – Enterprise Rollout & Optimization**  
	- เปิดใช้ทุกสาขา  
	- ติดตาม Adoption Metrics และปรับกฎในระบบอย่างต่อเนื่อง

---

## 6. ภาคผนวก: ทรัพยากรที่เกี่ยวข้องใน Repository

- `program-hub.html` – Storytelling Hub สำหรับ Problem → Solution → Impact
- `line-prototype.html` – Prototype Frontline Intake (พนักงานส่งใบเสร็จผ่าน LINE)
- `dashboard-prototype.html` – AI Confidence Dashboard / HITL Experience
- `pcard-program-prototype.html` – ROI Forecast & Program Rollout Dashboard
- `pcard-report-prototype.html` – Executive Report & SAP Journal Template
- `prompt/admin-prompt-console.html` – Prompt & Agent Management Console
- `prompt/*.md` – คำสั่งสำหรับ Agent แต่ละบทบาท (Employee Interface, OCR, Policy, Routing, Analytics, ERP Integration)
- `details/*.html` – HTML Preview ของแฟ้ม PV/ADV/PCV ที่ใช้สร้างข้อมูลจำลอง

---

> **สรุป**: เลือกทางสายกลางที่พิสูจน์แล้ว (COTS) เพื่อบรรลุ Automation 80%, Outcome 100% และสร้างความเชื่อมั่นใน AI โดยจัดวาง AI เป็น “ผู้ช่วย” ไม่ใช่ “ผู้พิพากษา” พร้อมเส้นทาง Roadmap ชัดเจนในการเชื่อม SAP/Treasury และบริหารเปลี่ยนผ่านทีมงาน
รายงานวิเคราะห์สถาปัตยกรรมโซลูชัน: การพัฒนาระบบเบิกจ่ายเงินสดย่อยอัตโนมัติ (Petty Cash Automation)ถึง: ผู้บริหารฝ่ายการเงินและเทคโนโลยีสารสนเทศ, Doi Tung Brandจาก: Solution Architect, ผู้เชี่ยวชาญด้าน Finance Automation และ ERP Integrationวันที่: 7 พฤศจิกายน 2568หัวข้อ: การวิเคราะห์และข้อเสนอแนะสถาปัตยกรรม 3 รูปแบบ (Sketches) สำหรับการปฏิรูปกระบวนการเบิกจ่ายเงินสดย่อย1. บทสรุปสำหรับผู้บริหาร: ข้อเสนอแนะเชิงกลยุทธ์สำหรับระบบอัตโนมัติแบบแบ่งเฟสรายงานฉบับนี้ นำเสนอการวิเคราะห์สถาปัตยกรรมโซลูชัน (Solution Architecture) 3 รูปแบบ หรือ "Sketches" ตามกรอบการทำงาน Design Sprint เพื่อแก้ไขปัญหาและลดภาระงานในกระบวนการเบิกจ่ายเงินสดย่อย (Petty Cash) ของ Doi Tung Brand ซึ่งปัจจุบันยังคงเป็นกระบวนการ Manual ที่มีความซ้ำซ้อนและเสี่ยงต่อข้อผิดพลาดสูง 1จากการวิเคราะห์ Pain Points และเป้าหมายระยะยาว (Long Term Goals) ที่ต้องการ "Automate 80% of volume" และ "100% Outcome (accuracy)" 1 ควบคู่ไปกับข้อจำกัดหลัก (Sprint Questions) โดยเฉพาะประเด็น "Untrust AI" (ความไม่เชื่อมั่นใน AI) และ "Budget/ROI" 1 พบข้อสรุปเบื้องต้นดังนี้:Sketch 1 (RPA): ให้ความสำคัญกับการแก้ปัญหา "Untrust AI" ได้ดีที่สุด โดยหลีกเลี่ยงการใช้ AI ในการตัดสินใจ แต่ล้มเหลวในการบรรลุเป้าหมาย "Automate 80%" ในภาพรวม เพราะไม่ได้แก้ไขต้นตอของปัญหาที่หน้าร้านSketch 2 (Custom Mobile+AI): มีศักยภาพในการทำ Automation ได้สูงสุด (อาจถึง 90%+) แต่มีต้นทุน (TCO) ความเสี่ยง และระยะเวลาดำเนินการ (Implementation Time) สูงที่สุด และขัดแย้งโดยตรงกับข้อจำกัด "Untrust AI"Sketch 3 (COTS Platform): เป็น "ทางสายกลาง" (Middle Path) ที่ดีที่สุด นำเสนอระบบอัตโนมัติในระดับสูง (80%+) ผ่านเครื่องมือที่ได้รับการพิสูจน์แล้ว และมีส่วนต่อประสานผู้ใช้ (User Interface) ที่เป็นมิตรข้อเสนอแนะหลัก (Final Recommendation)ทางทีมสถาปนิกโซลูชัน ขอเสนอแนะให้เลือกใช้ Sketch 3: COTS Expense Platform (แพลตฟอร์มบริหารค่าใช้จ่ายสำเร็จรูป) เนื่องจากเป็นแนวทางที่สมดุลและมีความเป็นไปได้ทางกลยุทธ์มากที่สุด โซลูชันนี้สามารถจัดการกับความท้าทาย "Untrust AI" ได้อย่างมีประสิทธิภาพ โดยการปรับเปลี่ยนมุมมองของ AI จาก "ผู้มีอำนาจตัดสินใจ" ที่คลุมเครือ (Opaque "decision-maker") ไปสู่ "ผู้ช่วย" (Helper) ที่จับต้องได้ (เช่น การทำ OCR อ่านใบเสร็จ) 3 ซึ่งช่วยให้บรรลุเป้าหมาย Automation ในระดับสูงและส่งมอบมูลค่า (Time-to-Value) ได้รวดเร็วที่สุดประเด็นสำคัญในการตัดสินใจ (Strategic Imperative)การเลือก Sketch 3 จะนำไปสู่การตัดสินใจย่อยที่สำคัญ คือการเลือกระหว่าง:Enterprise COTS (เช่น SAP Concur): ซึ่งจะช่วยลดความซับซ้อนในการเชื่อมต่อกับระบบ SAP เดิมอย่างมาก 4Local Thai COTS (เช่น PEAKflo, FlowAccount): ซึ่งให้ผลตอบแทนการลงทุน (ROI) ที่ดีกว่า และมีฟีเจอร์ที่ตอบโจทย์ใบกำกับภาษีของไทยโดยเฉพาะ 5 แต่ต้องใช้ความพยายามในการพัฒนาการเชื่อมต่อ (Custom Integration) กับทั้ง SAP และ Treasury เอง2. การวิเคราะห์กระบวนการปัจจุบัน (As-Is Process) และข้อจำกัดหลักทางสถาปัตยกรรมจากการทบทวนเอกสารสรุปผลการทำ "Map" Phase 1 สามารถยืนยันกระบวนการปัจจุบัน (As-Is User Journey) และข้อจำกัด (Constraints) ได้ดังนี้2.1. แผนที่กระบวนการปัจจุบัน (As-Is User Journey)พนักงาน (หน้าร้าน): รวบรวมใบเสร็จจริง (Physical receipts) กรอกแบบฟอร์มกระดาษหรือ Excel แล้วส่งเอกสารจริงไปยังฝ่ายการเงินส่วนกลางการเงิน (ส่วนกลาง): รับเอกสาร ตรวจสอบความถูกต้องเทียบกับนโยบายด้วยตนเอง (Manual verification) สแกนเอกสาร และทำการบันทึกข้อมูล (Data Entry) โดยการอัปโหลดไฟล์ PDF เข้าระบบปัจจุบัน (ระบุชื่อ "myelly...") 1ตรรกะของระบบ (System Logic): ระบบ (หรืออาจจะฝ่ายการเงิน) ทำการตรวจสอบและแบ่งแยกธุรกรรมตามยอดเงิน 1:ยอด > 300 บาท: ส่งเรื่องเข้าสู่กระบวนการในระบบ SAPยอด < 300 บาท: ส่งเรื่องเข้าสู่กระบวนการในระบบ Treasuryการจ่ายเงิน (Disbursement): ดำเนินการจ่ายเงินคืนพนักงานตามช่องทางที่กำหนด2.2. ข้อจำกัดหลักทางสถาปัตยกรรม (Core Constraints)ข้อจำกัดทางเทคนิค (The "Bifurcated Backend"): ตรรกะการแยกช่องทาง >300 (SAP) และ <300 (Treasury) 1 คือความท้าทายเชิงสถาปัตยกรรมที่ซับซ้อนที่สุด โซลูชันใหม่ จำเป็นต้องมี Workflow Engine ที่แข็งแกร่ง สามารถกำหนดเงื่อนไขการส่งต่อ (Conditional Routing) ที่ตรวจสอบย้อนกลับได้ (Auditable)ข้อจำกัดทางวัฒนธรรม ("Untrust AI"): Sprint Question 1 ระบุชัดเจนถึงความไม่เชื่อมั่นใน AI ของผู้ใช้งาน นี่คืออุปสรรคด้านการบริหารการเปลี่ยนแปลง (Change Management) ไม่ใช่ด้านเทคนิค หากโซลูชันที่นำเสนอถูกมองว่าเป็น "กล่องดำ" (Black Box) 7 ที่ไม่สามารถอธิบายการตัดสินใจได้ โซลูชันนั้นจะล้มเหลวในการนำไปใช้ (Adoption) แม้ว่าจะมีประสิทธิภาพทางเทคนิคสูงเพียงใดก็ตามข้อจำกัดทางธุรกิจ (The "HMWs"): โซลูชันต้องตอบโจทย์ "How Might We reduce workload" และ "How Might We for Human Error" 1 อย่างชัดเจน2.3. การระบุต้นตอของปัญหาภาระงาน (Workload)การวิเคราะห์ลึกลงไปพบว่า แม้ Pain Point ปัจจุบันจะมุ่งเน้นไปที่ภาระงานของทีม Finance (ผู้ทำการอัปโหลด PDF) 1 แต่ในความเป็นจริง ต้นตอของภาระงาน (True source of workload) และความล่าช้า เกิดจากกระบวนการที่ยังเป็นกระดาษและดำเนินการด้วยมือ ณ จุดเริ่มต้นที่หน้าร้านดังนั้น โซลูชันที่มุ่งเน้นเพียงการ "ช่วย" ทีม Finance ในการอัปโหลด PDF เป็นเพียงการแก้ปัญหาที่ปลายเหตุ (Sub-optimal patch) โซลูชันที่จะก่อให้เกิดการเปลี่ยนแปลง (Transformative solution) อย่างแท้จริง จะต้องขจัดงาน Manual ทั้งสำหรับ พนักงานหน้าร้าน และ ทีมการเงินส่วนกลาง3. Sketch 1: การใช้ RPA เสริมกระบวนการเดิม (RPA-Led Process Augmentation)แนวทางนี้คือ "The Non-Invasive Approach" หรือการ "ไม่ผ่าตัด" กระบวนการเดิม แต่เป็นการใช้เทคโนโลยี Robotic Process Automation (RPA) หรือ "Digital Worker" เข้ามาทำหน้าที่แทนทีม Finance ในขั้นตอนการคีย์ข้อมูล 83.1. สถาปัตยกรรมเชิงแนวคิด (Conceptual Architecture)พนักงาน (หน้าร้าน): กระบวนการยังคงเป็น Manual 100%การเงิน (ส่วนกลาง): สแกนเอกสารทั้งหมดไปวางไว้ใน "Watched Folder" ที่กำหนดRPA Bot (เช่น UiPath, Automation Anywhere): Bot จะถูกกระตุ้น (Trigger) เมื่อมีไฟล์ใหม่เข้ามาBot ใช้ Optical Character Recognition (OCR) ที่ติดตั้งมาด้วย (Embedded OCR) เพื่ออ่านข้อมูลจากไฟล์ PDFBot ทำการ Log in และคีย์ข้อมูลเข้าสู่ระบบ "myelly..." ตามขั้นตอนเดิมที่มนุษย์เคยทำBot ใช้ตรรกะเงื่อนไข (IF Amount > 300 THEN...) เพื่อแยกเส้นทาง 1:เส้นทาง SAP: Bot ใช้ SAP GUI Scripting (เทคนิคการสั่งงานหน้าจอ SAP โดยตรง) 10 เพื่อ Log in และบันทึกข้อมูลเข้า SAPเส้นทาง Treasury: Bot ทำการ Log in เข้าสู่ระบบ Treasury (ซึ่งคาดว่าเป็น Web-based) และคีย์ข้อมูล3.2. การวิเคราะห์ทางเทคนิคและการเงิน (TCO/ROI)การเชื่อมต่อ (Integration): สถาปัตยกรรมนี้อาศัยการทำงานอัตโนมัติผ่านหน้าจอผู้ใช้ (UI Automation) 12 ไม่ได้เชื่อมต่อผ่าน API ที่มั่นคง ซึ่งเป็นที่ทราบกันดีว่ามีความเปราะบางสูง (Fragile) หากมีการปรับเปลี่ยนหน้าตา (UI Update) ของระบบ "myelly...", SAP หรือ Treasury แม้เพียงเล็กน้อย Bot จะหยุดทำงานทันที และต้องการการบำรุงรักษาอย่างต่อเนื่อง 13TCO และ ROI: ต้นทุนรวม (TCO) จะมาจากค่าลิขสิทธิ์ Bot (Bot License), ค่าพัฒนา (Development) และค่าบำรุงรักษา (Maintenance) ที่สูงและเกิดขึ้นประจำ 13 ส่วนผลตอบแทนการลงทุน (ROI) จะถูกคำนวณได้ชัดเจน แต่จำกัดวงอยู่แค่การลดชั่วโมงการทำงาน (FTE Reduction) ของทีม Finance ในส่วนงาน Data Entry เท่านั้น 143.3. ผลกระทบต่อเป้าหมายและข้อจำกัดศักยภาพในการทำ Automation (เป้าหมาย 80%): ต่ำถึงปานกลาง โซลูชันนี้สามารถทำ Automation ได้เกือบ 80% ของ ขั้นตอนการคีย์ข้อมูลของ Finance แต่ทำ Automation ได้ 0% ของ กระบวนการทั้งหมดแบบ End-to-End (ยังคงมีงาน Manual ที่หน้าร้าน) ดังนั้น จึงถือว่าล้มเหลวในเจตนารมณ์ของเป้าหมาย "Automate 80%"ปัจจัยความเชื่อมั่นของผู้ใช้ ("Untrust AI"): สูงมาก นี่คือจุดแข็งที่สุดของ Sketch นี้ ทีม Finance ไม่ได้มองว่า RPA คือ "AI อัจฉริยะ" 16 แต่เป็น "Bot โง่" (Dumb Bot) ที่ทำงานตามกฎที่มนุษย์กำหนดไว้อย่างชัดเจน (Rule-based) มันถูกมองเป็น "ผู้ช่วยทำงานซ้ำซาก" ไม่ใช่ "ผู้ทำการตัดสินใจ" ซึ่งช่วยให้สามารถหลีกเลี่ยงข้อกังวลเรื่อง "Untrust AI" ได้อย่างสมบูรณ์ 174. Sketch 2: การสร้างแอปฯ มือถือและ AI ตรวจสอบนโยบาย (Mobile-First & AI-Driven Policy)แนวทางนี้คือ "The Transformative Build Approach" หรือการ "สร้างใหม่" โดยออกแบบกระบวนการทั้งหมดใหม่ (Re-engineering) โดยเริ่มจากจุดรับข้อมูล (Point of Capture)4.1. สถาปัตยกรรมเชิงแนวคิด (Conceptual Architecture)พนักงาน (หน้าร้าน): ใช้ Mobile Application ที่สร้างขึ้นใหม่สำหรับ Doi Tung โดยเฉพาะ ถ่ายรูปใบเสร็จรูปภาพจะถูกส่งไปยัง AI OCR Service (เช่น Azure AI Document Intelligence ซึ่งมีโมเดลสำหรับใบเสร็จโดยเฉพาะ 18 หรือ Google Document AI 20)AI Service จะประมวลผลและส่งข้อมูลที่มีโครงสร้าง (Structured JSON) กลับมา (เช่น ชื่อร้านค้า, ยอดเงิน, วันที่, VAT)ข้อมูล JSON นี้จะถูกป้อนเข้าสู่ AI-Driven Policy Engine 21 ที่พัฒนาขึ้นเอง (Custom-built) เพื่อตรวจสอบกับกฎระเบียบของบริษัทเมื่อธุรกรรมผ่านการตรวจสอบ (Validated) จะถูกส่งไปยัง API Gateway / Microservice Layer 22Routing Logic ที่สร้างขึ้นภายใน Gateway จะทำหน้าที่แยกเส้นทาง >300 (SAP) และ <300 (Treasury) และเรียกใช้งาน API ของระบบหลังบ้านทั้งสอง 234.2. การวิเคราะห์ทางเทคนิคและการเงิน (TCO/ROI)TCO (ต้นทุนการสร้าง): สูงมากMobile App: การพัฒนา Enterprise Workflow App ที่มีความซับซ้อนระดับนี้ในประเทศไทย อาจใช้เวลา 6-12 เดือน 25 และมีค่าใช้จ่ายประมาณ $100,000 - $300,000 (ประมาณ 3.6 - 11 ล้านบาท) 26AI Policy Engine: นี่คือจุดเสี่ยงและต้นทุนที่แท้จริง การสร้างระบบนี้เท่ากับการสร้าง "กล่องดำ" ที่การตัดสินใจ (เช่น "ไม่อนุมัติรายการนี้") มาจากโมเดล AI ซึ่งนำมาซึ่งความท้าทายมหาศาลในด้านความสามารถในการอธิบายผล (Explainability), ความลำเอียง (Bias) และจริยธรรม 21การเชื่อมต่อ (Integration): ซับซ้อนสูงสุด แนวทางนี้บังคับให้ Doi Tung ต้องลงทุนสร้างและบำรุงรักษา API Layer ที่ทันสมัยสำหรับระบบ Legacy อย่าง SAP และ Treasury ซึ่งถือเป็นโครงการ Modernization ขนาดใหญ่อีกโครงการหนึ่งแยกหาก 224.3. ผลกระทบต่อเป้าหมายและข้อจำกัดศักยภาพในการทำ Automation (เป้าหมาย 80%): สูงมาก เป็นโซลูชันเดียวที่สามารถทำ End-to-End Automation ได้เกิน 90% และอาจบรรลุเป้าหมาย "100% Outcome" (หากโมเดล AI ถูกต้องสมบูรณ์แบบ)ปัจจัยความเชื่อมั่นของผู้ใช้ ("Untrust AI"): ต่ำมาก โซลูชันนี้คือ นิยาม ของสิ่งที่ข้อจำกัด "Untrust AI" 1 เตือนไว้ พนักงานและทีม Finance จะถูกบังคับให้เชื่อถือ "ผู้พิพากษา AI" (AI Judge) ที่คลุมเครือและสร้างขึ้นเอง ในการตัดสินใจเรื่องเงินของพวกเขา4.4. ปัจจัยพื้นฐานที่จำเป็นต่อความสำเร็จสถาปัตยกรรมนี้ไม่ได้เป็นเพียง "โครงการ" แต่เป็นการสร้าง "ความสามารถใหม่ขององค์กร" (New Corporate Competency) หากต้องการให้สำเร็จ Doi Tung จำเป็นต้องลงทุนสร้างวัฒนธรรมองค์กรที่เข้าใจ AI และ Data Literacy (Data-driven culture) ก่อนกรณีศึกษาที่ชัดเจนคือ "เงินติดล้อ" (Ngern Tid Lor) 29 ที่ขับเคลื่อน Digital Transformation ได้สำเร็จโดยการสร้างตัวแทนการเปลี่ยนแปลงภายใน (เช่น ทีม "AI Gangster") และลงทุนอย่างหนักในการ Upskill ด้าน Data/AI ให้พนักงาน ก่อนที่จะนำ AI ขั้นสูงมาใช้ในวงกว้าง เช่นเดียวกับธนาคารไทย (เช่น KBank, SCB) ที่ใช้ AI ได้สำเร็จ ก็ล้วนมาจากการลงทุนเชิงกลยุทธ์และการบริหารการเปลี่ยนแปลงที่ชัดเจน 30 หาก Doi Tung เลือกแนวทางนี้ เท่ากับต้องดำเนิน 2 โครงการใหญ่พร้อมกัน คือ "การสร้างผลิตภัณฑ์ AI" และ "การสร้างวัฒนธรรม AI" ซึ่งมีความเสี่ยงสูงสุด5. Sketch 3: การใช้แพลตฟอร์มบริหารค่าใช้จ่ายสำเร็จรูป (COTS Expense Platform)แนวทางนี้คือ "The Best-Practices Approach" หรือกลยุทธ์ "Buy vs. Build" โดยการนำแพลตฟอร์มที่ได้รับการพิสูจน์ในตลาดแล้วมาปรับใช้5.1. สถาปัตยกรรมเชิงแนวคิด (Conceptual Architecture)พนักงาน (หน้าร้าน): ใช้ Mobile App ของ COTS (เช่น SAP Concur, PEAKflo) ถ่ายรูปใบเสร็จAI/OCR ที่ติดตั้งมาในแพลตฟอร์ม 31 จะทำการดึงข้อมูล (Extract)Workflow Engine ของแพลตฟอร์ม 32 ที่สามารถตั้งค่าได้ (Configurable) จะทำการตรวจสอบข้อมูลกับนโยบายของ Doi Tung (เช่น "ยอดเงินต้องไม่เกิน 500 บาท")Workflow Engine จะทำการ Routing Logic ตามเงื่อนไข >300 / <300 1 และเชื่อมต่อกับระบบหลังบ้าน5.2. การวิเคราะห์ทางเทคนิคและการเงิน (Platform Deep-Dive)สถาปัตยกรรมนี้มีทางเลือกย่อยที่ต้องพิจารณา 3 กลุ่ม:Option 3a: Enterprise Suite (เช่น SAP Concur)TCO/ROI: มี TCO ที่สูง จากข้อมูลในตลาด ค่าใช้จ่ายเฉลี่ยต่อปีอาจสูงถึง $100,000 (ประมาณ 3.6 ล้านบาท) 34 บวกกับค่าธรรมเนียมการ ImplementIntegration:จุดแข็ง: มีการเชื่อมต่อกับ SAP แบบ Native (Pre-built Connector) ที่ได้รับการรับรอง 4 นี่คือจุดขายที่ใหญ่ที่สุดจุดอ่อน: การเชื่อมต่อกับระบบ Treasury (ที่ไม่ใช่ SAP) จะต้องเป็นการพัฒนาแบบ Custom โดยอาศัย Web Services (REST APIs) หรือ SFTP ที่ Concur มีให้ 36Workflow Logic: Workflow Engine ของ Concur ถูกออกแบบมาเพื่อรองรับการ Routing ที่ซับซ้อนตามเงื่อนไข (เช่น ยอดเงิน, แผนก) และสามารถจัดการตรรกะ >300/<300 ได้อย่างแน่นอน 37Option 3b: Modern AI-First (เช่น Expensify)TCO/ROI: คิดราคาตามผู้ใช้งาน (Per-user) 39Integration: ไม่เหมาะสม (Poor fit) แพลตฟอร์มเหล่านี้ถูกสร้างมาเพื่อเชื่อมต่อกับ NetSuite, Xero, QuickBooks เป็นหลัก 39 การเชื่อมต่อกับ SAP ไม่ใช่ความสามารถหลัก จึงควรตัดตัวเลือกนี้ออกOption 3c: Local Thai Solutions (เช่น PEAKflo, FlowAccount)TCO/ROI: ให้ ROI สูงที่สุด เนื่องจากมี TCO ที่ต่ำกว่ามาก ถูกสร้างขึ้นเพื่อตลาดไทย (เข้าใจใบกำกับภาษีและระเบียบไทย) 5Integration: ต้องพัฒนาเองทั้งหมด (High Custom Work) นี่คือข้อแลกเปลี่ยนที่สำคัญ การเชื่อมต่อกับ ทั้ง SAP 43 และ Treasury จะต้องเป็นโครงการพัฒนา Custom Integration โดยใช้ Open API ของแพลตฟอร์มเหล่านี้ 44 และเครื่องมือเชื่อมต่อฝั่ง SAP (เช่น SAP Integration Suite) 46Features: มีองค์ประกอบที่จำเป็นครบถ้วน FlowAccount มีฟีเจอร์ "AutoKey" สำหรับการสแกนใบเสร็จด้วย AI 47 และ PEAKflo มีฟีเจอร์ Workflow การอนุมัติและนโยบายค่าใช้จ่ายที่แข็งแกร่ง 65.3. ผลกระทบต่อเป้าหมายและข้อจำกัดศักยภาพในการทำ Automation (เป้าหมาย 80%): สูง แพลตฟอร์มเหล่านี้ถูกออกแบบมาเพื่อทำ Automation กระบวนการ T&E (Travel & Expense) 80-90% ได้ทันที (Out-of-the-box)ปัจจัยความเชื่อมั่นของผู้ใช้ ("Untrust AI"): สูง นี่คือจุดที่แนวทางนี้เป็นผู้ชนะและตอบโจทย์ที่สุด โซลูชันนี้ แก้ไข ปัญหาความไม่เชื่อมั่นได้ โดยการวางตำแหน่งของ AI ที่แตกต่างออกไป:AI (OCR) ถูกนำเสนอในฐานะ "เครื่องมืออำนวยความสะดวก" (Productivity Utility) 3 (เช่น "ให้ AI ช่วยอ่านใบเสร็จ จะได้ไม่ต้องพิมพ์เอง") ซึ่งเป็นสิ่งที่พนักงานต้องการส่วนการตรวจสอบนโยบาย (Policy) ไม่ได้มาจาก "AI ลึกลับ" แต่มาจาก "Rules Engine" ที่โปร่งใส 33 ซึ่งทีม Finance สามารถกำหนดค่าและตรวจสอบได้ (เช่น "ตั้งกฎว่าห้ามเกิน 500 บาท") ผู้ใช้จึงเชื่อมั่นเพราะมันเป็นเครื่องมือทางธุรกิจที่ตรวจสอบได้ ไม่ใช่ "กล่องดำ" 496. ตารางเปรียบเทียบสถาปัตยกรรม (Decision Matrix)ตารางนี้สรุปการวิเคราะห์ทั้ง 3 Sketches โดยใช้เกณฑ์การตัดสินใจที่มาจาก "Sprint Questions" 1 เป็นหลักเกณฑ์การตัดสินใจ (จาก Sprint Questions)Sketch 1: RPA-Led AugmentationSketch 2: Mobile-First & AI-Driven PolicySketch 3: COTS Expense PlatformAutomation Potential (เป้าหมาย: Automate 80%)ต่ำ-ปานกลางAutomate เฉพาะงาน Data Entry ของ Finance (80%) แต่ 0% สำหรับงานของพนักงาน ล้มเหลวในการ Automate ทั้งกระบวนการสูงมากสามารถทำ End-to-End Automation ได้ >90% เป็นโซลูชันเดียวที่ขจัดงาน Manual ได้ทั้งหมดสูงพิสูจน์แล้วว่าสามารถ Automate กระบวนการ T&E ได้ 80-90% ทันที (Out-of-the-box)Impact on Workload (HMW: Reduce Workload)แก้ไขด้านเดียวลดภาระงาน Finance (สูง)ไม่ลดภาระงานพนักงาน (ยังคงส่งกระดาษ)แก้ไขทั้งระบบ (End-to-End)ลดภาระงานสูงมาก ทั้ง พนักงาน (แค่ถ่ายรูป) และ Finance (ไม่ต้องคีย์ข้อมูล)แก้ไขทั้งระบบ (End-to-End)ลดภาระงานสูงมาก ทั้ง พนักงาน (ใช้ Mobile App) และ Finance (เปลี่ยนเป็นผู้ตรวจสอบ)Budget / ROI (TCO และความคุ้มค่า)TCO ปานกลาง, ROI ปานกลางTCO จาก License และค่า Maintenance ที่สูง 13 ROI จำกัดอยู่แค่การลดเวลาทำงานของ FinanceTCO สูงมาก, ROI เสี่ยงสูงTCO >3-10 ล้านบาท และใช้เวลา 9-18 เดือน 25 ROI ขึ้นอยู่กับการยอมรับของผู้ใช้ 100%TCO ผันแปร, ROI สูงและเร็วTCO สูง สำหรับ Concur 34TCO ต่ำ-ปานกลาง สำหรับ Local COTS 5 Time-to-Value เร็วที่สุดImplementation Time (เรื่องเวลา)ปานกลาง3-6 เดือน สำหรับการพัฒนาและทดสอบ Botนานมาก9-18+ เดือน 25 เพราะต้องสร้าง Product ใหม่, ฝึก AI, และพัฒนา API เชื่อมระบบ Legacyเร็ว3-6 เดือน เน้นการตั้งค่า (Configure) และการเชื่อมต่อ (Integrate) ไม่ใช่การสร้างใหม่จากศูนย์Integration Complexity (เชื่อมต่อ SAP/Treasury)สูง (และเปราะบาง)ใช้ SAP GUI Scripting 10 และ UI Automation 12 ซึ่ง "พัง" ง่ายเมื่อระบบมีการอัปเดตสูงมาก (ต้องสร้างใหม่)ต้องสร้าง API/Microservice Layer 22 ขึ้นมาใหม่ทั้งหมด เพื่อคุยกับ SAP/Treasury 23ปานกลาง-สูง (แต่ชัดเจน)Concur: เชื่อม SAP ง่าย 4, เชื่อม Treasury ต้องทำเอง 36Local COTS: ต้องทำเองทั้ง SAP 43 และ Treasury 44User Trust Factor (โจทย์ "Untrust AI")สูงมากแก้โจทย์นี้ได้ดีที่สุด ถูกมองเป็น "Bot ช่วยงาน" (Dumb Bot) 16 ไม่มีการตัดสินใจที่คลุมเครือต่ำมากเป็นตัวเลือกที่ แย่ที่สุด สำหรับโจทย์นี้ บังคับให้ผู้ใช้เชื่อ "AI Judge" ที่เป็นกล่องดำ 7สูง (The "Sweet Spot")AI ถูกวางตัวเป็น "ผู้ช่วย" (Utility) 3 ส่วน Policy เป็น "กฎ" (Rules-based) ที่โปร่งใส 337. ข้อเสนอแนะสุดท้ายและแผนการดำเนินงาน (Strategic Roadmap)7.1. ข้อเสนอแนะเชิงกลยุทธ์ (Definitive Recommendation)จากการวิเคราะห์ใน Decision Matrix ขอเสนอแนะให้ Doi Tung Brand เลือกใช้ Sketch 3: COTS Expense Platformนี่เป็นสถาปัตยกรรมเดียวที่สร้างสมดุลระหว่างเป้าหมาย "Automate 80%" และการจัดการข้อจำกัด "Untrust AI" ได้อย่างลงตัว โดยสามารถลดภาระงานได้ทั้งระบบ (End-to-End) เหมือน Sketch 2 แต่ได้รับความไว้วางใจจากผู้ใช้งาน (User Trust) ในระดับสูง เหมือนเป็นแอปพลิเคชันทางธุรกิจมาตรฐานทั่วไป7.2. ข้อเสนอแนะเชิงกลยุทธ์ย่อย (Strategic Sub-Recommendation)การตัดสินใจเลือก Sketch 3 นำไปสู่ทางแยกระหว่าง COTS สองกลุ่ม ซึ่งขึ้นอยู่กับ "ความสามารถด้าน IT ภายใน" และ "ข้อจำกัดด้านงบประมาณ" ของ Doi Tung:เลือก SAP Concur (Enterprise): หากข้อจำกัดหลักคือ "ทรัพยากร IT สำหรับการเชื่อมต่อ" การยอมจ่าย TCO ที่สูง 34 เพื่อแลกกับ Connector สำเร็จรูปที่เชื่อมต่อกับ SAP ได้ทันที 4 ถือว่าคุ้มค่า และทีม IT จะรับผิดชอบพัฒนา Custom Integration เฉพาะส่วนของ Treasury เท่านั้น 36เลือก Local Thai COTS (เช่น PEAKflo): หากข้อจำกัดหลักคือ "Budget / ROI" การเลือกแพลตฟอร์มไทยจะให้ TCO ที่ต่ำกว่า 5 และตอบโจทย์ใบเสร็จแบบไทยได้ดีกว่า 42 โดยต้องยอมรับว่าทีม IT (หรือ Partner) ต้อง มีความสามารถในการพัฒนา Custom API Integration เพื่อเชื่อมต่อกับ ทั้งสองระบบ (SAP 43 และ Treasury 44)7.3. แผนการดำเนินงาน (Proposed Strategic Roadmap)Phase 1: Proof-of-Concept (PoC) (ระยะเวลา 4-6 สัปดาห์)ดำเนินการ PoC แบบมีค่าใช้จ่าย กับผู้ให้บริการ 2 ราย: 1) SAP Concur และ 2) Local COTS (เช่น PEAKflo 6)เป้าหมาย: ไม่ใช่แค่การทดสอบฟีเจอร์ แต่เป็นการ ทดสอบประสบการณ์ของนักพัฒนา (Developer Experience) ในการเชื่อมต่อ เพื่อให้ได้ต้นทุนการ Integration ที่แท้จริง และนำมาเปรียบเทียบ TCO ได้อย่างถูกต้องPhase 2: Integration & Configuration (ระยะเวลา 3-4 เดือน)ดำเนินการติดตั้งแพลตฟอร์มที่เลือกกำหนดค่า (Configure) Workflow Engine สำหรับตรรกะการแยกเส้นทาง >300 (SAP) / <300 (Treasury)พัฒนาและทดสอบ API/SFTP Connectors ทั้งสองระบบPhase 3: Change Management & Pilot Rollout (ระยะเวลา 1-2 เดือน)เป้าหมาย: จัดการข้อกังวล "Untrust AI" 1 โดยตรงAction 1: ปรับเปลี่ยนการสื่อสาร (Re-frame the Narrative): สื่อสารและตั้งชื่อเครื่องมือใหม่นี้ว่าเป็น "ผู้ช่วยจัดการค่าใช้จ่าย" (Petty Cash Helper) โดยเน้นประโยชน์ที่ พนักงาน จะได้รับ (เช่น "ทำเรื่องเบิกง่ายขึ้น ได้เงินคืนเร็วขึ้น ไม่ต้องเก็บกระดาษ") 3Action 2: สร้างกลุ่มผู้นำการเปลี่ยนแปลง (Create "AI Champions"): นำแนวคิด "AI Gangster" 29 มาประยุกต์ใช้ โดยสร้างกลุ่ม Pilot ที่มาจากพนักงานหน้าร้าน และ ทีม Finance ที่ได้รับความเชื่อถือ ให้พวกเขาทดลองใช้ก่อนและเป็นผู้บอกต่อ (Evangelists)Action 3: ปรับตำแหน่งของทีม Finance (Reposition Finance): บทบาทใหม่ของทีม Finance ไม่ใช่ "การคีย์ข้อมูล" (Data Entry) แต่คือ "การตรวจสอบโดยยกเว้น" (Review-by-Exception) พวกเขาคือผู้ตรวจสอบที่ บริหารจัดการ ระบบ 50 ซึ่งเป็นการยกระดับทักษะ (Empower) และตอบโจทย์ HMW "Better utilize our people" 1Phase 4: Enterprise-Wide Rollout & Optimizationเปิดใช้งานระบบสำหรับหน้าร้านทุกสาขาติดตามผลการใช้งาน (Adoption Metrics) และความแม่นยำของ AI (OCR) เพื่อปรับปรุงกฎ (Policy Rules) ในระบบอย่างต่อเนื่อง