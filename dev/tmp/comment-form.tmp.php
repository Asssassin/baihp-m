<?php
echo '{
    "alert": "something returning", // 根据评论的具体状态，后台定义？
    "status": "success",
    "content": "some content of comment", // 处理后的评论内容（unicode maybe）
    "username": "someone", // 存入数据库的提交评论的用户名
    "update": "2016-05-05" // 存入数据库的提交时间
}';
?>
