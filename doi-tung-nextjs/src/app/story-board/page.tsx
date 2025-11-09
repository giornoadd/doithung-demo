import Image from 'next/image';
import Link from 'next/link';

const stories = [
    {
        title: 'Card 1: แอปสแกน OCR',
        image: '/image/Gemini_Generated_Image_1.png',
        caption: 'มือถือพร้อมปุ่ม Scan Receipt แสดงใบเสร็จที่ถูกเส้นประสแกนและข้อความ AI Extracts เพื่อสื่อว่าส่งข้อมูลต่อได้ทันที',
        note: 'โทนเส้นร่างเรียบง่ายเหมือนร่างดินสอ',
        ariaLabel: 'มือถือกับปุ่มสแกนใบเสร็จ'
    },
    {
        title: 'Card 2: AI สแกน + Finance ตรวจ',
        image: '/image/Gemini_Generated_Image_2.png',
        caption: 'ลำดับจากพนักงานส่งใบเสร็จเข้าสู่ AI OCR ก่อนจบที่หน้าจอ Finance Dashboard ที่เทียบ AI Read กับใบเสร็จจริงและมีปุ่ม Approve / Reject',
        note: '',
        ariaLabel: 'ขั้นตอนพนักงานส่งใบเสร็จ AI OCR และ Finance dashboard'
    },
    {
        title: 'Card 3: LINE Bot สแกนใบเสร็จ',
        image: '/image/Gemini_Generated_Image_3.png',
        caption: 'อินเทอร์เฟซแชท LINE แสดงการส่งรูปใบเสร็จและการตอบกลับจากบอท “Got it: 150 THB from 7-Eleven” พร้อมพนักงานถือโทรศัพท์',
        note: '',
        ariaLabel: 'หน้าจอแชท LINE กับใบเสร็จและข้อความบอท'
    },
    {
        title: 'Card 4: ระบบ AI อ่าน PDF (หลังบ้าน)',
        image: '/image/Gemini_Generated_Image_4.png',
        caption: 'เอกสาร PDF วิ่งเข้าสู่กล่อง AI Process ก่อนแตกแขนงส่งผลลัพธ์ไปยัง SAP และ Treasury พร้อมคน Finance ที่ทำงานเบาลง',
        note: '',
        ariaLabel: 'เอกสาร PDF เข้าสู่กล่อง AI และส่งต่อ SAP Treasury'
    },
    {
        title: 'Card 5: ใช้ระบบ Enterprise (เช่น Concur)',
        image: '/image/Gemini_Generated_Image_5.png',
        caption: 'หน้าจอมือถือแอป SAP Concur แสดงใบเสร็จ ช่องกรอกข้อมูล และปุ่ม Submit พร้อมลูกศรเชื่อมต่อไปยัง SAP และ Treasury',
        note: '',
        ariaLabel: 'หน้าจอ SAP Concur กับการเชื่อมระบบ'
    },
    {
        title: 'Card 6: ใช้ Local FinTech (เช่น PEAK)',
        image: '/image/Gemini_Generated_Image_6.png',
        caption: 'อินเทอร์เฟซ FinTech ไทยระบุข้อมูลภาษี (Tax ID, VAT) พร้อมลูกศรที่เชื่อมต่อเข้าสู่ SAP และ Treasury แบบครบถ้วน',
        note: '',
        ariaLabel: 'หน้าจอ FinTech ไทยกับข้อมูลภาษีและการเชื่อมต่อ'
    },
    {
        title: 'Card 7: แอปสแกนแบบ Gamify',
        image: '/image/Gemini_Generated_Image_7.png',
        caption: 'มือถือแสดงคะแนน Quality Score, แถบความคืบหน้า, leaderboard และไอคอนแห่งความสำเร็จ เพื่อกระตุ้นการส่งผลลัพธ์ 100% outcome',
        note: '',
        ariaLabel: 'หน้าจอมือถือที่มี progress star และ leaderboard'
    },
    {
        title: 'Card 8: Agentic AI (แบ่งงานกันทำ)',
        image: '/image/Gemini_Generated_Image_8.png',
        caption: 'ผังงาน Agentic AI ที่แบ่งเป็น OCR Agent, Policy Agent และ Router Agent ก่อนแยกผลลัพธ์ไปยัง SAP และ Treasury อย่างเป็นระบบ',
        note: '',
        ariaLabel: 'ผังงาน OCR Agent Policy Agent และ Router Agent'
    }
];

const StoryCard = ({ story }: { story: typeof stories[0] }) => (
    <article className="card">
        <h3>{story.title}</h3>
        <div className="sketch" aria-label={story.ariaLabel}>
            <Image src={story.image} alt={story.title} width={300} height={220} loading="lazy" />
        </div>
        <div className="caption" dangerouslySetInnerHTML={{ __html: story.caption }}></div>
        {story.note && <div className="note">{story.note}</div>}
    </article>
);

export default function StoryBoard() {
    return (
        <>
            <div className="hero-gradient">
                <div style={{ maxWidth: '1220px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#006A4E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>DT</div>
                        <div>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.7rem', color: '#006A4E', fontWeight: 600, margin: 0 }}>Doi Tung Finance</p>
                            <h2 style={{ fontSize: '1.3rem', textAlign: 'left', letterSpacing: 0, color: '#475569', margin: 0, fontWeight: 600 }}>Storyboard</h2>
                        </div>
                    </div>
                    <Link href="/" className="btn-hub">← Back to Hub</Link>
                </div>
            </div>

            <div className="container">
                <h1 style={{ marginTop: '40px' }}>Doi Tung Petty Cash Automation Storyboard</h1>
                <p className="lead">ภาพสเก็ตช์แนวรายเส้นที่สรุปไอเดียหลักจากไฟล์ <strong>story-board.md</strong> ครอบคลุม 8 แนวทางยกระดับประสบการณ์ส่งใบเสร็จและการจัดการ Petty Cash ด้วย AI</p>

                <section className="grid" style={{ marginTop: '40px' }}>
                    {stories.map(story => <StoryCard key={story.title} story={story} />)}
                </section>
            </div>
        </>
    );
}