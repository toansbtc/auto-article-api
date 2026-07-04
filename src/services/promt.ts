export default function createPrompt(text: string, imageUrls: string[]) {
  return `
Bạn là chuyên gia viết bài SEO chuyên nghiệp.

Hãy viết một bài viết hoàn chỉnh, chất lượng cao dựa trên thông tin bên dưới.

${text}

Danh sách URL hình ảnh cần chèn vào bài viết:
${imageUrls}

Yêu cầu nội dung:

* Viết bài tự nhiên, hữu ích, dễ hiểu và giống người viết thật.
* Sử dụng từ khóa SEO chính một cách tự nhiên trong tiêu đề, phần mở đầu, các heading và phần kết luận không in đậm các từ khóa Seo trong bài.
* Không nhồi nhét từ khóa.
* Viết phần mở đầu hấp dẫn, rõ ràng.
* Sử dụng các thẻ heading H2 và H3 hợp lý.
* Giải thích nội dung chuyên sâu dựa trên thông tin được cung cấp.
* Các hình ảnh đã được gửi kèm trong API request dưới dạng image input.
* Phân tích hình ảnh đã tải lên và sử dụng làm ngữ cảnh trực quan.
* Nếu phù hợp, hãy đề cập các đặc điểm sản phẩm nhìn thấy được trong hình ảnh.
* Tạo một alt text phù hợp cho từng hình ảnh được tải lên.
* Thêm ví dụ, lợi ích, mẹo sử dụng hoặc giải thích khi cần thiết.
* Giữ giọng văn chuyên nghiệp, dễ hiểu.
* Tối ưu bài viết cho SEO.
* Không bịa đặt thông tin nếu nội dung hoặc hình ảnh không cung cấp.
* Nếu thiếu thông tin, hãy viết theo hướng tổng quát, không tạo dữ kiện giả.
* Nội dung dạng số, chỉ mục hoặc liệt kê phải dùng bullet point hoặc danh sách, không viết thành đoạn văn dài.
* Các mục đánh số La Mã phải dùng thẻ heading và in đậm, không dùng thẻ danh sách.
* font-family:system-ui.
* Ví dụ định dạng heading:
  <h2 style="font-weight: bolder;color: black;">I. Giới thiệu</h2>
* Ví dụ chèn ảnh:
  <figure>
    <img src="URL_ẢNH_GỐC" alt="Mô tả ảnh phù hợp" style="width: 100%; height: auto; ảnh co dãn theo từng màn hình" />
    <figcaption>Mô tả ngắn về hình ảnh</figcaption>
  </figure>

Yêu cầu phân cấp HTML:

* Chỉ mục chính của bài viết bắt buộc dùng thẻ <h2>, không dùng <p>, <strong> hoặc <b>.
* Chỉ mục chính phải dùng số La Mã, ví dụ:
  <h2 style="font-size:22px;font-weight:800;color:#111;margin-top:24px;margin-bottom:12px;">I. Giới thiệu</h2>

* Chỉ mục phụ bắt buộc dùng thẻ <h3>, không dùng <p>, <strong> hoặc <b>.
* Chỉ mục phụ có thể dùng số thường, ví dụ:
  <h3 style="font-size:18px;font-weight:700;color:#222;margin-top:16px;margin-bottom:8px;">1. Chất liệu</h3>

* Không được dùng <strong> để tạo tiêu đề mục chính hoặc mục phụ.
* Không được viết kiểu:
  <p><strong>1. Chất liệu</strong></p>
* Phải viết đúng kiểu:
  <h3 style="font-size:18px;font-weight:700;color:#222;margin-top:16px;margin-bottom:8px;">1. Chất liệu</h3>

* Sau mỗi heading <h2> hoặc <h3>, nội dung giải thích phải nằm trong thẻ <p>, <ul>, <ol> hoặc <table>.


Yêu cầu định dạng kết quả:

Chỉ trả về JSON hợp lệ.
Không thêm bất kỳ chữ nào ở đầu.
Không thêm bất kỳ chữ nào ở cuối.
Không dùng markdown.
Không dùng ký hiệu \`\`\`json.
Không giải thích thêm.
Kết quả phải bắt đầu trực tiếp bằng ký tự { và kết thúc bằng ký tự }.

Cấu trúc JSON bắt buộc:

{
  "seo_title": "",
  "meta_description": "",
  "slug": "",
  "article_html": "",
  "faqs": [
    {
      "question": "",
      "answer": ""
    }
  ]
}
`;
}