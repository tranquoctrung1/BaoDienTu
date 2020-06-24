// const getNewsDetails = require("../controller/getNewsDetails.controller");
// route.get("/", getNewsDetails.loadnewsDetails);

const express = require('express');
const router = express.Router();

router.get("/newsDetails", (req, res) => {
    // res.render('vwNews/NewsDetails');
  
    const list = [
      { UserName: 'User Name 01', Comment: 'Comment 01' },
      { UserName: 'User Name 02', Comment: 'Comment 02' },
      { UserName: 'User Name 03', Comment: 'Comment 03' },
    ];

    const listTag = [{tag: 'doi song'},{tag: 'dien anh'}]
  
    res.render('vwNews/NewsDetails',{
      comment: list,
      title: 'Chuyện gì sẽ xảy ra sau ‘Tomb Raider: Huyền thoại bắt đầu’?',
      author: 'Nguyễn Văn A',
      postDateTime: '24/06/2020',
      abstract: 'Năm 2018, “Tomb Raider” với sự tham gia của Alicia Vikander nhận được phản hồi tích cực nhất định từ phía khán giả. Hậu truyện đang được lên kế hoạch ra mắt trong năm 2021.',
      content: 'Theo Digital Spy, phần tiếp thep của Tomb Raider sẽ có sự tham gia của Ben Wheatley trong vai trò đạo diễn, thay thế cho Roar Uthaug từ phần trước. Biên kịch Amy Jump, vợ của Bean Wheatley, đảm nhận việc xây dựng kịch bản cho bộ phim do nữ diễn viên chính thủ vai Lara Croft - Alicia Vikander - rất thích những sản phẩm của bà. Tên tuổi của Ben Wheatley được cộng đồng hâm mộ điện ảnh biết đến qua những bộ phim cult (những tác phẩm dành cho một nhóm khán giả nhất định và khó được đón nhận bởi đông đảo đại chúng) như Kill List (2011) và High Rise (2015). Cả hai đều được xây dựng từ kịch bản chấp bút bởi Amy Jump.',
      tag: listTag
    })
});

module.exports = router;
